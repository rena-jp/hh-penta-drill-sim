import { selectTargetFrom } from '../random';
import type { TurnParams } from '../types';

// Sexomancer
// necro_revive

function simulate({ attacker, attackerTeam }: TurnParams) {
  const targets = attackerTeam.list.filter((e) => e.is_defeated);
  if (targets.length) {
    const target = selectTargetFrom(targets);
    let heal = attacker.remaining_ego;
    if (!attacker.is_hero_fighter) {
      heal = Math.ceil(heal * 0.05);
    }
    target.remaining_ego += heal;
    if (target.remaining_ego > 0) target.is_defeated = false;
    attacker.remaining_mana -= 100;
  }
}

function validate() {}

export default { simulate, validate };
