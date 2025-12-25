import type { TurnParams } from '../types';

// Mana Steal (Voyeur)
// mana_steal

function simulate({ attacker, defenderTeam }: TurnParams) {
  const percentage = attacker.trigger_skill.percentage_value! / 100;
  const targets = defenderTeam.list.filter((e) => e.remaining_mana > 0);
  const stolenMana = Math.floor(
    percentage *
      targets.reduce((p, c) => {
        const mana = Math.floor(c.remaining_mana * percentage);
        c.remaining_mana -= mana;
        return p + c.remaining_mana + mana;
      }, 0),
  );
  attacker.remaining_mana = Math.min(
    100,
    attacker.remaining_mana - 100 + stolenMana,
  );
}

function validate() {}

export default { simulate, validate };
