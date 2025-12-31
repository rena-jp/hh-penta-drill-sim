import { receiveDamage } from '../common';
import { selectTargetFrom } from '../random';
import type { TurnParams } from '../types';

// Spank! (Dominatrix) + No skill
// punch

function simulate({ attacker, defenderTeam, teamSlot }: TurnParams) {
  const percentage = attacker.trigger_skill.percentage_value! / 100;
  const targets = defenderTeam.list.filter((e) => !e.is_defeated);
  const defender = selectTargetFrom(targets);
  let attackPower = attacker.damage;
  if (teamSlot === 5 && attacker.tier4_skill > 0) {
    attackPower *= (1 + attacker.tier4_skill / 100) ** attacker.tier4_count;
  }
  let damage = Math.ceil(attackPower * percentage) - defender.defense;
  damage = Math.max(0, damage);
  receiveDamage(defender, damage);
  attacker.remaining_mana -= 100;
}

function validate() {}

export default { simulate, validate };
