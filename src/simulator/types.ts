import type { SimGirl, SimTeam } from '../common/types';

export interface RoundParams {
  heroTeam: SimTeam;
  opponentTeam: SimTeam;
  teamSlot: number;
}

export interface TurnParams extends RoundParams {
  attacker: SimGirl;
  attackerTeam: SimTeam;
  defenderTeam: SimTeam;
}
