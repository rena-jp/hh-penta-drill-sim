import type { SimGirl, SimTeam } from '../common/types';

export interface RoundParams {
  heroTeam: SimTeam;
  opponentTeam: SimTeam;
}

export interface TurnParams extends RoundParams {
  attacker: SimGirl;
  attackerTeam: SimTeam;
  defenderTeam: SimTeam;
}

export interface SkillParams extends TurnParams {
  flat: number;
  percentage: number;
  level: number;
}
