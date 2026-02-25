import { getPatchedTeam, patchTeam } from '../team';
import type { TurnParams } from '../types';
import type { RoundLog } from '../validator';

export function validateSkill(params: TurnParams, roundLog: RoundLog) {
  const { attacker } = params;
  if (attacker.stun_summary === 0) {
    try {
      // simulateSkill(params);
      // validateAfterSkill(params, roundLog);
      /*
       */
      throw 0;
    } catch (e) {
      // console.log(logPos, e);
      {
        const { initial, after_hit, after_skill } = roundLog.changes.hero;
        let current = getPatchedTeam(initial, after_hit);
        current = getPatchedTeam(current, after_skill);
        patchTeam(params.heroTeam.map, current);
      }
      {
        const { initial, after_hit, after_skill } = roundLog.changes.opponent;
        let current = getPatchedTeam(initial, after_hit);
        current = getPatchedTeam(current, after_skill);
        patchTeam(params.opponentTeam.map, current);
      }
    }
  }
}
