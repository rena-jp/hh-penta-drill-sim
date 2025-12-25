import { selectTargetsFrom } from '../random';
import type { TurnParams } from '../types';

// Shields Up (Sensual)
// shield_many

function simulate({ attacker, attackerTeam }: TurnParams) {
  const percentage = attacker.trigger_skill.percentage_value! / 100;
  let targets = attackerTeam.list.filter(
    (e) =>
      e != attacker &&
      !e.is_defeated &&
      e.total_shields_amount >= e.initial_ego,
  );
  targets = selectTargetsFrom(targets, 3);
  targets.forEach((e) => {
    const shield = Math.ceil(e.initial_ego * percentage);
    e.total_shields_amount = Math.min(
      e.initial_ego,
      e.total_shields_amount + shield,
    );
  });
  attacker.remaining_mana -= 100;
}

function validate() {}

export default { simulate, validate };
