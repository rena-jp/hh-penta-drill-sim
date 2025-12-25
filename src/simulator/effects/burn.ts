import type { SimGirl } from '../../common/types';
import { attack } from '../common';

function simulate({ attacker }: { attacker: SimGirl }) {
  if (attacker.burn_summary.length > 0) {
    const burn = attacker.burn_summary[0]!;
    burn.rounds_left--;
    attack(attacker, burn.damage);
    if (burn.rounds_left <= 0) {
      attacker.burn_summary.shift();
    }
  }
}

function validate() {}

export default { simulate, validate };
