import { attack } from '../common';
import { selectTargetFrom } from '../random';
import type { TurnParams } from '../types';

// Spank! (Dominatrix) + No skill
// punch

function simulate({ attacker, defenderTeam }: TurnParams) {
  const percentage = attacker.trigger_skill.percentage_value! / 100;
  const targets = defenderTeam.list.filter((e) => !e.is_defeated);
  const defender = selectTargetFrom(targets);
  let damage = Math.ceil(attacker.damage * percentage) - defender.defense;
  damage = Math.max(0, damage);
  attack(defender, damage);
  attacker.remaining_mana -= 100;
}

function validate() {}

export default { simulate, validate };
