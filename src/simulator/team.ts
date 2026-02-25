import type { SimTeam, RoundInitialGirl } from '../common/types';
import type { LogPatches, LogTeam } from './validator';

export function validateTeam(expected: SimTeam, actual: LogTeam) {
  const logs = [] as any[];
  const eMap = expected.map;
  const aMap = actual;
  Object.keys(aMap).forEach((id) => {
    // const eGirl = eMap[id];
    // const aGirl = aMap[id];
    const log = validateGirl(eMap[id]!, aMap[id]!);
    if (log) {
      console.log(eMap[id], aMap[id]);
      throw new Error('validateTeam');
      // logs.push(log);
    }
  });
  return logs.length > 0;
}

export function validateGirl(
  expected: RoundInitialGirl,
  actual: RoundInitialGirl,
) {
  const logs = [] as any[];
  (
    [
      'id_fighter',
      'id_girl',
      'damage',
      'defense',
      'chance',
      'remaining_ego',
      'remaining_mana',
      'speed',
      'is_hero_fighter',
      'total_shields_amount',
      'is_defeated',
    ] as const
  ).forEach((e) => {
    const expectedValue = expected[e];
    const actualValue = actual[e];
    if (expectedValue !== actualValue) {
      console.log('invalid', {
        key: e,
        expectedValue,
        actualValue,
        expected,
        actual,
      });
      logs.push({
        type: 'girl params',
        key: e,
        expected: expectedValue,
        actual: actualValue,
      });
    }
  });
  return logs.length > 0;
}

export function getPatchedTeam(logTeam: LogTeam, patches: LogPatches) {
  return Object.fromEntries(
    Object.entries(logTeam).map(([id, girl]) => {
      return [id, { ...girl, ...patches[id] }];
    }),
  );
}

export function patchTeam(logTeam: LogTeam, patches: LogPatches) {
  Object.entries(patches).forEach(([id, patch]) => {
    Object.assign(logTeam[id]!, patch);
  });
}
