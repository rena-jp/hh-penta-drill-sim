import { getTeamsFromGamePlayer } from '../common/data';
import {
  type BattleDebugLog,
  type FighterLog,
  type PentaDrillBattleResponseData,
  type RoundGirl,
  type RoundInitialGirl,
  type SimTeam,
  type Team,
} from '../common/types';
import { BurnEffect, ReassuranceEffect, StunEffect } from './effects';
import { validateHit } from './phases/hit';
import { validateSkill } from './phases/skill';
import { isDefeated } from './simulator';
import { getPatchedTeam, validateTeam } from './team';
import type { RoundParams, TurnParams } from './types';

type LogGirl = RoundInitialGirl;
export type LogTeam = Record<string, LogGirl>;
type LogPatch = Partial<RoundInitialGirl>;
export type LogPatches = Record<string, LogPatch>;
type LogTargetGirl = RoundGirl;

export interface ChangeLog {
  initial: LogTeam;
  before_hit: LogPatches;
  after_hit: LogPatches;
  after_skill: LogPatches;
  after_status_effect: LogPatches;
}

export interface AttackerLog {
  attacker: LogTargetGirl;
  defender: LogTargetGirl;
  blocked_damage: number;
  id_hitter_girl: number;
  is_critical: boolean;
  is_dodged: boolean;
  is_finisher: boolean;
  is_healing: boolean;
  total_damage: number; // maybe fake value
}

type LogChange = ChangeLog;
type LogChanges = {
  hero: LogChange;
  opponent: LogChange;
};

interface AttackerHit {
  attacker: LogTargetGirl;
  blocked_damage: number;
  defender: LogTargetGirl;
  id_hitter_girl: number;
  is_critical: boolean;
  is_dodged: boolean;
  is_finisher: boolean;
  is_healing: boolean;
  total_damage: number;
}

export interface RoundLog {
  who: 'hero' | 'opponent';
  attacker_id_girl: number;
  attacker_hit: AttackerHit | null;
  attacker_skill: null;
  attacker_burn_hit: null;
  defender_id_girl: number; // maybe fake value
  changes: LogChanges;
}

export interface Logs {
  hero_fighter: Team[];
  hero_fighter_v4: FighterLog;
  opponent_fighter: Team[];
  opponent_fighter_v4: FighterLog;
  responseData: PentaDrillBattleResponseData;
}

type VProgress = {
  isOver: boolean;
  logPos: number;
};

/*
export async function validatePentaDrill() {
  const cache = await unsafeWindow.caches.open('penta-drill-logs');
  const responses = [...(await cache.matchAll())];
  const logs = [];
  let i = 0;
  for (const response of responses) {
    if (i++ >= 20) break;
    const results = (await response.json()) as Logs;
    if (!results.responseData.success) continue;
    const player = getTeamsFromGamePlayer({
      ...results.hero_fighter_v4,
      is_hero: true,
    });
    const opponent = getTeamsFromGamePlayer({
      ...results.opponent_fighter_v4,
      is_hero: false,
    });
    const log = validateBattle(
      player,
      opponent,
      results.responseData.team_rounds,
    );
    logs.push(log);
  }
  return logs;
}
*/

export function validatePentaDrill({
  hero_fighter_v4,
  opponent_fighter_v4,
  responseData,
}: BattleDebugLog) {
  if (!responseData.success) return;
  const player = getTeamsFromGamePlayer({
    ...hero_fighter_v4,
    is_hero: true,
  });
  const opponent = getTeamsFromGamePlayer({
    ...opponent_fighter_v4,
    is_hero: false,
  });
  validateBattle(player, opponent, responseData.team_rounds);
}

export function validateBattle(
  heroTeams: SimTeam[],
  opponentTeams: SimTeam[],
  roundsLogs: { rounds: RoundLog[] }[],
) {
  const matches = Math.min(
    heroTeams.length,
    opponentTeams.length,
    roundsLogs.length,
  );
  let currentRounds = 0;
  for (let i = 0; i < matches; i++) {
    const heroTeam = heroTeams[i]!;
    const opponentTeam = opponentTeams[i]!;
    const roundLogs = roundsLogs[i]!.rounds;
    const result = validateMatch(
      heroTeam,
      opponentTeam,
      currentRounds,
      i + 1,
      roundLogs,
    );
    currentRounds = result.rounds;
    if (result.points === 1) currentRounds = 0;
  }
  return [];
}

function validateMatch(
  heroTeam: SimTeam,
  opponentTeam: SimTeam,
  startRounds: number,
  teamSlot: number,
  roundLogs: RoundLog[],
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
  let logPos = 0;
  for (let i = startRounds + 1; i <= 100; i++) {
    const results = validateRound(order, roundLogs, logPos);
    logPos = results.logPos;
    if (results.isOver) {
      return { rounds: i };
    }
  }
  return { points: 1, rounds: 100 };
}

function validateRound(
  order: TurnParams[],
  roundLogs: RoundLog[],
  logPos: number,
): VProgress {
  for (let i = 0, n = order.length; i < n; i++) {
    const turn = order[i % n]!;

    if (i === 0) {
      // cannot validate because of no log
      ReassuranceEffect.simulate([turn.attackerTeam, turn.defenderTeam]);
    }

    try {
      const results = validateTurn(turn, roundLogs, logPos);
      logPos = results.logPos;
      if (results.isOver) return results;
    } catch (e) {
      console.log(roundLogs[logPos], roundLogs, logPos);
      console.log(e);
      throw e;
    }
  }
  return { isOver: false, logPos };
}

function validateTurn(
  params: TurnParams,
  roundLogs: RoundLog[],
  logPos: number,
): VProgress {
  const { attacker, attackerTeam, defenderTeam } = params;

  // skip because of no log
  let isSkip = false;
  isSkip ||= attacker.is_defeated;
  isSkip ||= attacker.stun_summary > 0 && attacker.burn_summary.length == 0;
  if (isSkip) {
    if (
      params.attacker.is_hero_fighter === (roundLogs[logPos]?.who === 'hero') &&
      params.attacker.id_girl === roundLogs[logPos]?.attacker_id_girl
    ) {
      console.log(params, roundLogs[logPos]);
      console.log(logPos, roundLogs);
      throw new Error('Actual: turn is not skipped');
    }
    // console.log('skip');
    return { isOver: false, logPos };
  }

  const roundLog = roundLogs[logPos++]!;
  if (roundLog.attacker_id_girl !== attacker.id_girl) {
    throw new Error('wrong turn', {
      cause: {
        expected: attacker.id_girl,
        actual: roundLog.attacker_id_girl,
        roundLog,
        logPos,
      },
    });
  }

  validateInitial(params, roundLog);

  validateHit(params, roundLog);
  validateAfterHit(params, roundLog);
  if (isDefeated(defenderTeam)) {
    return { isOver: true, logPos };
  }

  validateSkill(params, roundLog);
  validateAfterSkill(params, roundLog);
  if (isDefeated(defenderTeam)) {
    return { isOver: true, logPos };
  }

  StunEffect.simulate(params);
  BurnEffect.simulate({ attacker });
  validateAfterStatusEffect(params, roundLog);

  if (isDefeated(attackerTeam)) {
    return { isOver: true, logPos };
  }

  return { isOver: false, logPos };
}

export function validateInitial(expected: RoundParams, actual: RoundLog) {
  const logs = [] as any[];
  logs.push(validateTeam(expected.heroTeam, actual.changes.hero.initial));
  logs.push(
    validateTeam(expected.opponentTeam, actual.changes.opponent.initial),
  );
  if (logs.some(Boolean)) {
    throw new Error('validateInitial');
  }
  return logs.some(Boolean);
}

function validateAfterHit(params: TurnParams, roundLog: RoundLog) {
  const { heroTeam, opponentTeam } = params;
  const { hero, opponent } = roundLog.changes;
  /*
  [[heroTeam, hero] as const, [opponentTeam, opponent] as const].forEach(
    ([team, change]) => {
      const current = getPatchedTeam(change.initial, change.after_hit);
      validateTeam(team, current);
    },
  );
  */
  validateEachAfterHit(heroTeam, hero);
  validateEachAfterHit(opponentTeam, opponent);

  function validateEachAfterHit(team: SimTeam, change: ChangeLog) {
    const { initial, after_hit } = change;
    const current = getPatchedTeam(initial, after_hit);
    validateTeam(team, current);
  }
}

function validateAfterSkill(params: TurnParams, roundLog: RoundLog) {
  const { hero, opponent } = roundLog.changes;
  validateEachAfterSkill(params.heroTeam, hero);
  validateEachAfterSkill(params.opponentTeam, opponent);

  function validateEachAfterSkill(team: SimTeam, change: ChangeLog) {
    const { initial, after_hit, after_skill } = change;
    let current = getPatchedTeam(initial, after_hit);
    current = getPatchedTeam(current, after_skill);
    validateTeam(team, current);
  }
}

function validateAfterStatusEffect(params: TurnParams, roundLog: RoundLog) {
  const { hero, opponent } = roundLog.changes;
  validateEachAfterSkill(params.heroTeam, hero);
  validateEachAfterSkill(params.opponentTeam, opponent);

  function validateEachAfterSkill(team: SimTeam, change: ChangeLog) {
    const { initial, after_hit, after_skill, after_status_effect } = change;
    let current = getPatchedTeam(initial, after_hit);
    current = getPatchedTeam(current, after_skill);
    current = getPatchedTeam(current, after_status_effect);
    validateTeam(team, current);
  }
}
