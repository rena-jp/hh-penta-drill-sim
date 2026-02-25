import { resetTeams } from '../common/data';
import { RoleId, type SimTeam } from '../common/types';
import { receiveDamage, getLowestEgoValue } from './common';
import { BurnEffect, ReassuranceEffect, StunEffect } from './effects';
import { isCritical, selectTargetFrom } from './random';
import {
  Burnout,
  Lovestruck,
  ManaBoost,
  ManaSteal,
  Reassurance,
  Recovery,
  Sexomancer,
  ShieldsUp,
  Spank,
} from './skills';
import type { TurnParams } from './types';

export function simulatePentaDrill(
  heroTeams: SimTeam[],
  opponentTeams: SimTeam[],
  count: number,
) {
  const pointTable = Array(11).fill(0);
  let totalPoints = 0;
  let totalRounds = 0;
  let minRounds = Number.MAX_SAFE_INTEGER;
  let maxRounds = 0;
  for (let i = 0; i < count; i++) {
    [heroTeams, opponentTeams].forEach((e) => resetTeams(e));
    const { points, rounds } = simulateBattle(heroTeams, opponentTeams);
    pointTable[points]++;
    totalPoints += points;
    totalRounds += rounds;
    minRounds = Math.min(minRounds, rounds);
    maxRounds = Math.max(maxRounds, rounds);
  }
  return {
    points: totalPoints / count,
    pointTable: pointTable.map((e) => e / count),
    rounds: totalRounds / count,
    minRounds,
    maxRounds,
  };
}

export function simulateBattle(heroTeams: SimTeam[], opponentTeams: SimTeam[]) {
  const matches = Math.min(heroTeams.length, opponentTeams.length);
  let points = 0;
  let currentRounds = 0;
  let sumRounds = 0;
  for (let i = 0; i < matches; i++) {
    const heroTeam = heroTeams[i]!;
    const opponentTeam = opponentTeams[i]!;
    const result = simulateMatch(heroTeam, opponentTeam, currentRounds, i + 1);
    points += result.points;
    sumRounds += result.rounds - currentRounds;
    currentRounds = result.rounds;
    if (result.points === 1) currentRounds = 0;
  }
  return { points, rounds: sumRounds };
}

function simulateMatch(
  heroTeam: SimTeam,
  opponentTeam: SimTeam,
  startRounds: number,
  teamSlot: number,
) {
  const order = [
    ...opponentTeam.list.map((girl) => ({
      attacker: girl,
      attackerTeam: opponentTeam,
      defenderTeam: heroTeam,
      heroTeam,
      opponentTeam,
      teamSlot,
    })),
    ...heroTeam.list.map((girl) => ({
      attacker: girl,
      attackerTeam: heroTeam,
      defenderTeam: opponentTeam,
      heroTeam,
      opponentTeam,
      teamSlot,
    })),
  ];
  order.sort((x, y) => y.attacker.speed - x.attacker.speed);
  for (let i = startRounds + 1; i <= 100; i++) {
    const results = simulateRound(order);
    if (results.isOver) {
      return { points: results.points, rounds: i };
    }
  }
  return { points: 1, rounds: 100 };
}

export type Progress =
  | {
      isOver: false;
    }
  | {
      isOver: true;
      points: number;
    };

export function simulateRound(order: TurnParams[]): Progress {
  for (let i = 0, n = order.length; i < n; i++) {
    const turn = order[i % n]!;
    if (i === 0) {
      ReassuranceEffect.simulate([turn.attackerTeam, turn.defenderTeam]);
    }
    const results = simulateTurn(turn);
    if (results.isOver) return results;
  }
  return { isOver: false };
}

export function simulateTurn(params: TurnParams): Progress {
  const { attacker, attackerTeam, defenderTeam } = params;
  if (attacker.is_defeated) return { isOver: false };
  attacker.tier4_count++;

  const { isStunned } = StunEffect.simulate(params);
  if (!isStunned) {
    if (attacker.id_role === RoleId.Fluffer) {
      const { noHeal } = simulateFlufferHeal(params);
      if (noHeal) simulateAttack(params);
    } else {
      simulateAttack(params);
    }

    simulateManaGeneration(params);

    if (isDefeated(defenderTeam)) {
      return createResult(attacker.is_hero_fighter);
    }

    simulateSkill(params);

    if (isDefeated(defenderTeam)) {
      return createResult(attacker.is_hero_fighter);
    }
  }

  BurnEffect.simulate({ attacker });

  if (isDefeated(attackerTeam)) {
    return createResult(!attacker.is_hero_fighter);
  }

  return { isOver: false };
}

export function createResult(isWin: boolean): Progress {
  return { isOver: true, points: isWin ? 2 : 0 };
}

export function isDefeated(team: SimTeam): boolean {
  return team.list.every((e) => e.is_defeated);
}

export function simulateManaGeneration({ attacker }: TurnParams) {
  if (attacker.remaining_mana < 100) {
    const addingMana = attacker.id_role === RoleId.Spermcaster ? 35 : 20;
    attacker.remaining_mana += addingMana;
    if (attacker.remaining_mana > 100) attacker.remaining_mana = 100;
  }
}

export function simulateSkill(turn: TurnParams) {
  const { attacker } = turn;
  if (attacker.remaining_mana >= 100) {
    const skill = attacker.trigger_skill;
    const params = {
      ...turn,
      level: skill.level,
      flat: skill.flat_value!,
      percentage: skill.percentage_value! / 100,
    };
    const roleId = attacker.id_role;
    if (roleId === 10) {
      // (Sexomancer) necro_revive
      Sexomancer.simulate(params);
    } else {
      const skillId = skill.id_skill;
      // Spank! (Dominatrix) punch
      if (skillId === 15) Spank.simulate(params);
      // Recovery (Submissive) heal_up
      if (skillId === 16) Recovery.simulate(params);
      // Mana Steal (Voyeur) mana_steal
      if (skillId === 17) ManaSteal.simulate(params);
      // Shields Up (Sensual) shield_many
      if (skillId === 18) ShieldsUp.simulate(params);
      // Burnout! (Eccentric) burn
      if (skillId === 19) Burnout.simulate(params);
      // Mana Boost (Exhibitionist) mana_boost
      if (skillId === 20) ManaBoost.simulate(params);
      // Reassurance (Physical) defenses_up
      if (skillId === 21) Reassurance.simulate(params);
      // Lovestruck (Playful) stun_many
      if (skillId === 22) Lovestruck.simulate(params);
      // (No skill) light_punch
      if (skillId === 23) Spank.simulate(params);
    }
  }
}

export function simulateFlufferHeal({ attacker, attackerTeam }: TurnParams): {
  noHeal: boolean;
} {
  const flufferTargets = attackerTeam.list.filter(
    (e) => e !== attacker && !e.is_defeated && e.remaining_ego < e.initial_ego,
  );
  if (flufferTargets.length === 0) return { noHeal: true };
  const target =
    flufferTargets.length === 1
      ? flufferTargets[0]!
      : flufferTargets.reduce((p, c) =>
          p.remaining_ego <= c.remaining_ego ? p : c,
        );

  let heal = attacker.damage;
  if (isCritical(attacker, target)) {
    heal += Math.max(0, attacker.damage - target.defense);
  }
  if (!attacker.is_hero_fighter) heal = Math.ceil(heal * 0.05);
  heal = Math.min(heal, target.initial_ego - target.remaining_ego);
  target.remaining_ego += heal;
  return { noHeal: false };
}

export function simulateAttack({ attacker, defenderTeam }: TurnParams) {
  let defender;
  if (attacker.id_role === RoleId.Corkscrewer) {
    defender = getLowestEgoValue(defenderTeam);
  } else {
    let targets = defenderTeam.front.filter((e) => !e.is_defeated);
    if (targets.length === 0)
      targets = defenderTeam.middle.filter((e) => !e.is_defeated);
    if (targets.length === 0)
      targets = defenderTeam.back.filter((e) => !e.is_defeated);
    defender = selectTargetFrom(targets);
  }

  let damage = Math.max(0, attacker.damage - defender.defense);
  if (isCritical(attacker, defender)) {
    if (attacker.id_role === RoleId.Bugger) {
      damage = Math.ceil(damage * 2.4);
    } else {
      // Pleasurelock do nothing
      damage *= 2;
    }
  }

  receiveDamage(defender, damage);
}
