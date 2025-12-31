import type {
  Fighter,
  FighterGirl,
  GameSkill,
  Player,
  SimGirl,
  SimTeam,
  Team,
  TeamGirl,
} from './types';

export function getTeamsFromFighters(fighter: Fighter): SimTeam[] {
  const { is_hero } = fighter;
  return fighter.fighters.map((fighters) => {
    const list = fighters.map((e) => getGirlFromFighter(e));
    const ids = list.map((e) => e.id_girl);
    const map = Object.fromEntries(list.map((e) => [e.id_girl, e]));
    const team = {
      ids,
      is_hero,
      list,
      map,
      front: [2, 3].map((e) => list[e]).filter((e) => e != null),
      middle: [0, 1, 4].map((e) => list[e]).filter((e) => e != null),
      back: [5, 6].map((e) => list[e]).filter((e) => e != null),
      reassurance_summary: [],
      pleasurelock_damage: 0,
    };
    return team;
  });
}

export function getTeamsFromGamePlayer(player: Player): SimTeam[] {
  return player.team.map((e) => getTeamFromGameTeam(e, player.is_hero));
}

function getTeamFromGameTeam(team: Team, isHero: boolean): SimTeam {
  const list = team.girls.map((e) => getGirlFromTeamGirl(e, isHero));
  const ids = list.map((e) => e.id_girl);
  const map = Object.fromEntries(list.map((e) => [e.id_girl, e]));
  return {
    ids,
    is_hero: isHero,
    list,
    map,
    front: [2, 3].map((e) => list[e]).filter((e) => e != null),
    middle: [0, 1, 4].map((e) => list[e]).filter((e) => e != null),
    back: [5, 6].map((e) => list[e]).filter((e) => e != null),
    reassurance_summary: [],
    pleasurelock_damage: 0,
  };
}

export function getGirlFromFighter(girl: FighterGirl): SimGirl {
  return {
    id_fighter: girl.id_fighter,
    id_girl: girl.id_girl,
    is_hero_fighter: girl.is_hero_fighter,
    damage: girl.damage,
    defense: girl.defense,
    chance: girl.chance,
    speed: girl.speed,
    id_role: girl.girl.girl.id_role,
    tier4_skill: getSkill4(girl.girl),
    tier4_count: 0,
    trigger_skill: girl.trigger_skill,
    initial_defense: girl.defense,
    initial_ego: girl.initial_ego,
    mana_starting: girl.remaining_mana,
    // mana_generation: girl.girl.battle_caracs.mana_generation, // 20
    remaining_ego: girl.initial_ego,
    remaining_mana: girl.remaining_mana,
    total_shields_amount: girl.total_shields_amount,
    is_defeated: false,
    burn_summary: [],
    stun_summary: 0,
  };
}

export function getGirlFromTeamGirl(girl: TeamGirl, isHero: boolean): SimGirl {
  const caracs = girl.battle_caracs;
  return {
    id_fighter: girl.id_member,
    id_girl: girl.id_girl,
    is_hero_fighter: isHero,
    damage: caracs.damage,
    defense: caracs.defense,
    chance: caracs.chance,
    speed: caracs.speed,
    id_role: girl.girl.id_role,
    tier4_skill: getSkill4(girl),
    tier4_count: 0,
    trigger_skill: getSkill5(girl),
    initial_defense: caracs.defense,
    initial_ego: caracs.ego,
    mana_starting: caracs.mana_starting,
    // mana_generation: girl.girl.battle_caracs.mana_generation, // 20 or 35
    remaining_ego: caracs.ego,
    remaining_mana: caracs.mana_starting,
    total_shields_amount: 0,
    is_defeated: false,
    burn_summary: [],
    stun_summary: 0,
  };
}

function getSkill4(girl: TeamGirl): number {
  return girl.skills[9]?.skill.percentage_value ?? 0;
}

function getSkill5(girl: TeamGirl): GameSkill {
  // Skill can be overridden by Sexomancer, Recovering a teammate, 'necro_revive'
  return (
    (
      [
        15, // darkness, Spank!, 'punch'
        16, // light, Recovery, 'heal_up'
        17, // psychic, Mana Steal, mana_steal
        18, // water, Shields Up, 'shield_many'
        19, // fire, Burnout!, 'burn'
        20, // nature, Mana Boost, 'mana_boost'
        21, // stone, Reassurance, 'defenses_up'
        22, // sun, Lovestruck, 'stun_many'
        // 23, // Spank!, "light_punch"
      ] as const
    ).reduce((p: GameSkill | undefined, c: number) => {
      return p ?? girl.skills[c]?.skill;
    }, undefined) ?? {
      id_skill: 23,
      level: 0,
      skill_type: 'light_punch',
      flat_value: null,
      percentage_value: 50,
    }
  );
}

export function resetTeams(teams: SimTeam[]) {
  teams.forEach((e) => resetTeam(e));
}

function resetTeam(team: SimTeam) {
  team.list.forEach((e) => resetGirl(e));
  team.reassurance_summary = [];
  team.pleasurelock_damage = 0;
}

function resetGirl(girl: SimGirl) {
  girl.defense = girl.initial_defense;
  girl.remaining_ego = girl.initial_ego;
  girl.remaining_mana = girl.mana_starting;
  girl.total_shields_amount = 0;
  girl.is_defeated = false;
  girl.burn_summary = [];
  girl.stun_summary = 0;
  girl.tier4_count = 0;
}
