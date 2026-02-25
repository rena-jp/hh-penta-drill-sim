import type {
  Element,
  Fighter,
  FighterLog,
  Player,
  Rarity,
  RoleId,
} from './types';

declare global {
  interface Window {
    // head (document-body)
    $: JQueryStatic;
    SITE_ROOT: string;
    IMAGES_URL: string;
    hh_nutaku: null | {
      sess: string;
    };

    // document-body - document-end
    hhPlusPlusConfig?: HHPlusPlusConfig;

    // body (document-end)
    GT: {
      design: Record<string, string>;
    };
    GIRL_MAX_LEVEL: number;
    HH_UNIVERSE: string;
    shared: {
      Hero: {
        infos: {
          id: number;
        };
      };
    };
    // server_now_ts?: number;
    // current_page: string;
  }

  interface String {
    toImageUrl(resizingType: 'ava' | 'avb' | 'ico'): string;
  }

  interface JQuery {
    selectric(
      arg?:
        | string
        | {
            maxHeight?: number;
            disableOnMobile: boolean;
            nativeOnMobile: boolean;
            onChange?: (element: HTMLSelectElement) => void;
            optionsItemBuilder?:
              | string
              | ((itemData: {
                  className: string;
                  disabled: boolean;
                  selected: boolean;
                  element: JQuery<HTMLOptionElement>;
                  index: number;
                  slug: string;
                  text: string;
                  value: string;
                }) => string);
          },
    ): JQuery;
  }

  interface HHPlusPlusConfig {
    registerGroup(group: { name: string; key: string }): void;
    registerModule<T extends string>(module: HHPlusPlusModule<T>): void;
    runModules(): void;
    loadConfig(): void;
  }

  interface HHPlusPlusModule<T extends string> {
    group: string;
    configSchema: {
      restriction?: { whitelist: string[]; blacklist: string[] };
      baseKey: string;
      label: string;
      default: boolean;
      subSettings?: { key: T; default: boolean; label: string }[] | undefined;
    };
    hasRun: boolean;
    run(
      subSettings: Record<T, boolean>,
    ): void | boolean | Promise<void | boolean>;
    tearDown(): void;
  }

  interface HHPlusPlusHelpers {
    isCurrentPage(matcher: string): boolean;
    onAjaxResponse(
      pattern: string | RegExp,
      callback: (
        responseData: unknown,
        opt: JQueryAjaxSettings,
        xhr: JQuery.jqXHR,
        evt: JQuery.TriggeredEvent,
      ) => void,
    ): void;
  }

  // /penta-drill-arena.html
  interface Window {
    player_datas?: Player;
    opponents_list?: { player: Player }[];
  }

  // /penta-drill-pre-battle
  interface Window {
    hero_fighter?: Fighter;
    opponent_fighter?: Fighter;
  }

  // /penta-drill-battle
  interface Window {
    // hero_fighter?: Team[];
    hero_fighter_v4?: FighterLog;
    // opponent_fighter?: Team[];
    opponent_fighter_v4?: FighterLog;
  }

  // /edit-penta-drill-team
  // /edit-labyrinth-team.html
  interface Window {
    hero_fighter?: Fighter;
    opponent_fighter?: Fighter;
    availableGirls?: AvailableGirl[];
    all_teams?: {
      girls: AvailableGirl[];
    }[];
  }

  interface AvailableGirl {
    affection: number;
    awakening_level: number;
    battle_caracs: {
      chance: number;
      damage: number;
      defense: number;
      ego: number;
      mana_generation: number;
      mana_starting: number;
      speed: number;
    };
    class: number;
    element: Element;
    figure: number;
    graded: number;
    graded2: string;
    ico: string;
    id_girl: number;
    id_role: RoleId;
    level: number;
    nb_grades: number;
    power_display: number;
    rarity: Rarity;
    role_data: { id: number };
    xp: number;
  }
}

export {};
