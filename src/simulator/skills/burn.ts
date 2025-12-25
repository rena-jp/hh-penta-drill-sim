import { selectTargetsFrom } from '../random';
import type { TurnParams } from '../types';

// Burnout! (Eccentric)
// burn

function simulate({ attacker, defenderTeam }: TurnParams) {
  const flat = attacker.trigger_skill.flat_value!;
  const percentage = attacker.trigger_skill.percentage_value! / 100;
  let targets = defenderTeam.list.filter((e) => !e.is_defeated);
  targets = selectTargetsFrom(targets, 2);
  targets.forEach((e) => {
    const damage = Math.ceil(e.initial_ego * percentage);
    e.burn_summary.push({ damage, rounds_left: flat });
  });
  attacker.remaining_mana -= 100;
}

function validate() {}

export default { simulate, validate };
