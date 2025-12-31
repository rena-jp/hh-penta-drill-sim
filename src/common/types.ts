/**
 * Common
 */

export const Rarities = [
  'starting',
  'common',
  'rare',
  'epic',
  'legendary',
  'mythic',
] as const;

export type Rarity = (typeof Rarities)[number];

export const Rarity = {
  Starting: 'starting',
  Common: 'common',
  Rare: 'rare',
  Epic: 'epic',
  Legendary: 'legendary',
  Mythic: 'mythic',
} as const;

export const Elements = [
  'darkness',
  'light',
  'psychic',
  'water',
  'fire',
  'nature',
  'stone',
  'sun',
] as const;

export type Element = (typeof Elements)[number];

export const Element = {
  Dominatrix: 'darkness',
  Submissive: 'light',
  Voyeur: 'psychic',
  Sensual: 'water',
  Eccentric: 'fire',
  Exhibitionist: 'nature',
  Physical: 'stone',
  Playful: 'sun',
} as const;

// Caution: may be not English
export const ElementNameMap = {
  darkness: 'Dominatrix',
  light: 'Submissive',
  psychic: 'Voyeur',
  water: 'Sensual',
  fire: 'Eccentric',
  nature: 'Exhibitionist',
  stone: 'Physical',
  sun: 'Playful',
} as const;

export const RoleIds = [1, 2, 3, 4, 5, 6, 9, 10] as const;

export type RoleId = (typeof RoleIds)[number];

export const RoleId = {
  Masochist: 1,
  Spermcaster: 2,
  Dominator: 3,
  Fluffer: 4,
  Corkscrewer: 5,
  Bugger: 6,
  Pleasurelock: 9,
  Sexomancer: 10,
} as const;

// Caution: may be not English
export const RoleNameMap = {
  1: 'Masochist',
  2: 'Spermcaster',
  3: 'Dominator',
  4: 'Fluffer',
  5: 'Corkscrewer',
  6: 'Bugger',
  9: 'Pleasurelock',
  10: 'Sexomancer',
} as const;

export const SkillIds = [15, 16, 17, 18, 19, 20, 21, 22, 23] as const;

export type SkillId = (typeof SkillIds)[number];

export const SkillId = {
  Spank: 15,
  Recovery: 16,
  ManaSteal: 17,
  ShieldsUp: 18,
  Burnout: 19,
  ManaBoost: 20,
  Reassurance: 21,
  Lovestruck: 22,
  NoSkill: 23,
} as const;

export const SkillTypes = [
  'punch', // 15
  'heal_up', // 16
  'mana_steal', // 17
  'shield_many', // 18
  'burn', // 19
  'mana_boost', // 20
  'defenses_up', // 21
  'stun_many', // 22
  'light_punch', // 23
  'necro_revive', // ?
] as const;

export type SkillType = (typeof SkillTypes)[number];

export const SkillType = {
  Spank: 'punch',
  Recovery: 'heal_up',
  ManaSteal: 'mana_steal',
  ShieldsUp: 'shield_many',
  Burnout: 'burn',
  ManaBoost: 'mana_boost',
  Reassurance: 'defenses_up',
  Lovestruck: 'stun_many',
  NoSkill: 'light_punch',
  Sexomancer: 'necro_revive',
} as const;

export const SkillTypeFromSkillId = {
  15: 'punch',
  16: 'heal_up',
  17: 'mana_steal',
  18: 'shield_many',
  19: 'burn',
  20: 'mana_boost',
  21: 'defenses_up',
  22: 'stun_many',
  23: 'light_punch',
  // ?: 'necro_revive',
} as const;

export const SkillIdFromSkillType = {
  punch: 15,
  heal_up: 16,
  mana_steal: 17,
  shield_many: 18,
  burn: 19,
  mana_boost: 20,
  defenses_up: 21,
  stun_many: 22,
  light_punch: 23,
} as const;

export const SkillNameFromSkillId = {
  15: 'Spank!',
  16: 'Recovery',
  17: 'Mana Steal',
  18: 'Shields Up',
  19: 'Burnout!',
  20: 'Mana Boost',
  21: 'Reassurance',
  22: 'Lovestruck',
  23: 'No Skill',
} as const;

export const SkillNameFromSkillType = {
  punch: 'Spank!',
  heal_up: 'Recovery',
  mana_steal: 'Mana Steal',
  shield_many: 'Shields Up',
  burn: 'Burnout!',
  mana_boost: 'Mana Boost',
  defenses_up: 'Reassurance',
  stun_many: 'Lovestruck',
  light_punch: 'No Skill',
  necro_revive: 'Sexomancer',
} as const;

export const SkillTypeFromElement = {
  darkness: 'punch',
  light: 'heal_up',
  psychic: 'mana_steal',
  water: 'shield_many',
  fire: 'burn',
  nature: 'mana_boost',
  stone: 'defenses_up',
  sun: 'stun_many',
} as const; //as Record<ElementType, SkillType>;

/**
 * for HH++
 */

export interface MyModule<T extends string> {
  key: string;
  label: string;
  default?: boolean;
  settings?: { key: T; default: boolean; label: string }[];
  run(settings: Record<T, boolean>): void | boolean | Promise<void | boolean>;
  undo?(): boolean;
}

/**
 * from /penta-drill-arena.html
 */

export interface Player {
  id_fighter: number;
  is_hero: boolean;
  team: Team[];
}

export interface Team {
  id_member: number | null;
  girls: TeamGirl[];
}

export interface TeamGirl {
  id_member: number;
  id_girl: number;
  battle_caracs: BattleCaracs;
  skills: [] | Record<number, { skill: GameSkill }>;
  girl: {
    id_role: number;
    role_data: GameRole;
  };
}

export interface BattleCaracs {
  damage: number;
  defense: number;
  chance: number;
  ego: number;
  mana_generation: number;
  mana_starting: number;
  speed: number;
}

export interface GameRole {
  id: RoleId;
  name: string; // maybe not English
  flavour: string; // maybe not English
}

/**
 * from /penta-drill-pre-battle
 */

export interface Fighter {
  id_fighter: number;
  is_hero: boolean;
  team: Team[];
  fighters: FighterGirl[][];
}

export interface FighterLog {
  id_fighter: number;
  team: Team[];
  fighters: FighterGirl[];
}

export interface FighterGirl {
  id_fighter: number;
  id_girl: number;
  damage: number;
  defense: number;
  chance: number;
  initial_ego: number;
  remaining_ego: number;
  remaining_mana: number;
  speed: number;
  is_hero_fighter: boolean;
  percent_remaining_ego: number;
  percent_remaining_mana: number;
  total_shields_amount: number;
  trigger_skill: GameSkill;
  girl: TeamGirl;
}

export interface GameSkill {
  id_skill: SkillId;
  skill_type: SkillType;
  flat_value: number | null;
  percentage_value: number | null;
  level: number;
}

export interface SimTeam {
  ids: number[];
  is_hero: boolean;
  list: SimGirl[];
  map: Record<string, SimGirl>;
  front: SimGirl[];
  middle: SimGirl[];
  back: SimGirl[];
  reassurance_summary: {
    rounds_left: number;
    buffs: [SimGirl, number][];
  }[]; // TODO
  pleasurelock_damage: number;
}

export interface RoundGirl {
  // id_fighter: number; // no use
  id_girl: number;
  damage: number;
  defense: number;
  chance: number;
  speed: number;
  remaining_ego: number;
  remaining_mana: number;
  total_shields_amount: number;
  // stun_summary: null; // no use
}

export interface RoundInitialGirl {
  id_fighter: number;
  id_girl: number;
  is_hero_fighter: boolean;
  damage: number;
  defense: number;
  chance: number;
  speed: number;
  remaining_ego: number;
  remaining_mana: number;
  total_shields_amount: number;
  is_defeated: boolean;
}

export interface SimGirl extends RoundInitialGirl {
  id_girl: number;
  is_hero_fighter: boolean;
  damage: number;
  defense: number;
  chance: number;
  speed: number;
  id_role: number;
  trigger_skill: GameSkill;
  tier4_skill: number;
  tier4_count: number;
  initial_defense: number;
  initial_ego: number;
  mana_starting: number;
  remaining_ego: number;
  remaining_mana: number;
  total_shields_amount: number;
  is_defeated: boolean;
  burn_summary: { damage: number; rounds_left: number }[];
  stun_summary: number;
}
