import type { SimGirl } from '../common/types';

export function isCritical(attacker: SimGirl, defender: SimGirl) {
  const p = (0.3 * attacker.chance) / (attacker.chance + defender.chance);
  return Math.random() < p;
}

export function selectTargetFrom(targets: SimGirl[]): SimGirl {
  return targets[Math.floor(targets.length * Math.random())]!;
}

export function selectTargetsFrom(targets: SimGirl[], maxCount: number) {
  if (targets.length <= maxCount) return targets;
  const ret = [] as SimGirl[];
  [...(Array(maxCount) as [])].forEach(() => {
    const i = Math.floor(Math.random() * targets.length);
    ret.push(targets[i]!);
    targets[i] = targets[targets.length - 1]!;
    targets.length--;
  });
  return ret;
}
