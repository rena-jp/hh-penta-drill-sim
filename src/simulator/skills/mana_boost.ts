import { selectTargetsFrom } from '../random';
import type { TurnParams } from '../types';

// Mana Boost (Exhibitionist)
// mana_boost

function simulate({ attacker, attackerTeam }: TurnParams) {
  const flat = attacker.trigger_skill.flat_value!;
  let targets = attackerTeam.list.filter(
    (e) => e != attacker && !e.is_defeated,
  );
  targets = selectTargetsFrom(targets, 2);
  targets.forEach((e) => {
    // e.remaining_mana = Math.min(100, e.remaining_mana + flat);
    e.remaining_mana += flat;
  });
  attacker.remaining_mana -= 100;
}

function validate() {}

export default { simulate, validate };
