import type { SimGirl, SimTeam } from '../common/types';

export function attack(defender: SimGirl, damage: number) {
  if (defender.total_shields_amount >= damage) {
    defender.total_shields_amount -= damage;
  } else {
    defender.remaining_ego -= damage - defender.total_shields_amount;
    defender.total_shields_amount = 0;
    if (defender.remaining_ego <= 0) defender.is_defeated = true;
  }
}

export function getLowestEgoValue(team: SimTeam) {
  return team.list
    .filter((e) => !e.is_defeated)
    .reduce((p, c) => (p.remaining_ego <= c.remaining_ego ? p : c));
}

export function getLowestEgoPercentage(team: SimTeam) {
  return team.list
    .filter((e) => !e.is_defeated)
    .reduce((p, c) =>
      p.remaining_ego / p.initial_ego <= c.remaining_ego / c.initial_ego
        ? p
        : c,
    );
}
