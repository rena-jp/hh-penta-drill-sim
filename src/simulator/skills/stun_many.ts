import { selectTargetsFrom } from '../random';
import type { TurnParams } from '../types';

// Lovestruck (Playful)
// stun_many

function simulate({ attacker, defenderTeam }: TurnParams) {
  const level = attacker.trigger_skill.level;
  // TODO: Check Probability
  const p = 0.1 + level * 0.035;
  if (Math.random() < p) {
    let targets = defenderTeam.list.filter((e) => !e.is_defeated);
    targets = selectTargetsFrom(targets, 2);
    targets.forEach((e) => {
      e.stun_summary += 2;
    });
    attacker.remaining_mana -= 100;
  }
}

function validate() {}

export default { simulate, validate };
