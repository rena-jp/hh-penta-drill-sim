import type { TurnParams } from '../types';

// Recovery (Submissive)
// heal_up

function simulate({ attacker, attackerTeam }: TurnParams) {
  const percentage = attacker.trigger_skill.percentage_value! / 100;
  attackerTeam.list
    .filter((e) => !e.is_defeated)
    .forEach((e) => {
      let heal = Math.ceil(e.initial_ego * percentage);
      if (!attacker.is_hero_fighter) {
        heal = Math.ceil(heal * 0.05);
      }
      e.remaining_ego = Math.min(e.initial_ego, e.remaining_ego + heal);
    });
  attacker.remaining_mana -= 100;
}

function validate() {}

export default { simulate, validate };
