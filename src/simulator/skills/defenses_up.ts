import type { SimGirl } from '../../common/types';
import type { TurnParams } from '../types';

// Reassurance (Physical)
// defenses_up

function simulate({ attacker, attackerTeam }: TurnParams) {
  const flat = attacker.trigger_skill.flat_value!;
  const percentage = attacker.trigger_skill.percentage_value! / 100;
  const targets = attackerTeam.list.filter((e) => !e.is_defeated);
  const buffs = targets.map((e) => {
    const buff = Math.ceil(e.initial_defense * percentage);
    e.defense += buff;
    return [e, buff] as [SimGirl, number];
  });
  attackerTeam.reassurance_summary.push({
    buffs,
    rounds_left: flat,
  });
  attacker.remaining_mana -= 100;
}

function validate() {}

export default { simulate, validate };
