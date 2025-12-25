import type { TurnParams } from '../types';

function simulate({ attacker }: TurnParams): {
  isStunned: boolean;
} {
  if (attacker.stun_summary > 0) {
    attacker.stun_summary--;
    return { isStunned: true };
  }
  return { isStunned: false };
}

function validate() {}

export default { simulate, validate };
