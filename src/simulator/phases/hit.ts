import { RoleId } from '../../common/types';
import { receiveDamage } from '../common';
import { isDefeated, simulateManaGeneration } from '../simulator';
import type { TurnParams } from '../types';
import type { RoundLog } from '../validator';

export function validateHit(params: TurnParams, roundLog: RoundLog) {
  const { attacker, defenderTeam } = params;
  if (attacker.stun_summary === 0) {
    if (attacker.id_role === RoleId.Fluffer) {
      const { noHeal } = validateFlufferHeal(params, roundLog);
      if (noHeal) validateAttack(params, roundLog);
    } else {
      validateAttack(params, roundLog);
    }

    simulateManaGeneration(params);

    if (isDefeated(defenderTeam)) {
      // return { isOver: true };
    }
  }
}

export function validateFlufferHeal(
  { attacker, attackerTeam }: TurnParams,
  roundLog: RoundLog,
): {
  noHeal: boolean;
} {
  if (roundLog.attacker_hit == null) throw new Error('Actual: no hit');

  const flufferTargets = attackerTeam.list.filter(
    (e) => e !== attacker && !e.is_defeated && e.remaining_ego < e.initial_ego,
  );
  if (flufferTargets.length === 0) return { noHeal: true };

  /*
  const target =
    flufferTargets.length === 1
      ? flufferTargets[0]!
      : flufferTargets.reduce((p, c) =>
          p.remaining_ego <= c.remaining_ego ? p : c,
        );
  */
  const target = attackerTeam.map[roundLog.attacker_hit.defender.id_girl]!;

  let heal = attacker.damage;
  const isCritical = roundLog.attacker_hit.is_critical;
  if (isCritical) {
    heal += Math.max(0, attacker.damage - target.defense);
  }
  if (!attacker.is_hero_fighter) heal = Math.ceil(heal * 0.05);
  heal = Math.min(heal, target.initial_ego - target.remaining_ego);
  target.remaining_ego += heal;
  return { noHeal: false };
}

export function validateAttack(
  { attacker, defenderTeam }: TurnParams,
  roundLog: RoundLog,
) {
  if (roundLog.attacker_hit == null) throw new Error('Actual: no hit');

  const defenderId = roundLog.defender_id_girl;
  const defender = defenderTeam.map[defenderId]!;

  /*
  if (attacker.id_role === RoleId.Corkscrewer) {
    defender = getLowestEgoValue(defenderTeam);
  } else {
    let targets = defenderTeam.front.filter((e) => !e.is_defeated);
    if (targets.length == 0)
      targets = defenderTeam.middle.filter((e) => !e.is_defeated);
    if (targets.length == 0)
      targets = defenderTeam.back.filter((e) => !e.is_defeated);
    defender = selectTargetFrom(targets);
  }
  */

  let damage = Math.max(0, attacker.damage - defender.defense);
  const isCritical = roundLog.attacker_hit.is_critical;
  if (isCritical) {
    if (attacker.id_role === RoleId.Bugger) {
      damage = Math.ceil(damage * 2.4);
    } else {
      // Pleasurelock do nothing
      damage *= 2;
    }
  }

  receiveDamage(defender, damage);
}
