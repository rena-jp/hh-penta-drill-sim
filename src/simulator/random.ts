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
  const temp = [...targets];
  const ret = [] as SimGirl[];
  [...Array<never>(maxCount)].forEach(() => {
    const i = Math.floor(Math.random() * temp.length);
    ret.push(temp[i]!);
    temp[i] = temp[temp.length - 1]!;
    temp.length--;
  });
  return ret;
}
