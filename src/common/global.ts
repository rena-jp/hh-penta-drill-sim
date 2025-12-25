import type { Player, Fighter } from './types';

declare global {
  interface Window {
    $: JQueryStatic;
    hhPlusPlusConfig?: HHPlusPlusConfig;
    GT: {
      design: Record<string, string>;
    };
  }

  interface JQuery {
    selectric(arg: string): JQuery;
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

  // /edit-penta-drill-team
  // /edit-labyrinth-team.html
  interface Window {
    hero_fighter?: Fighter;
    opponent_fighter?: Fighter;
    availableGirls?: AvailableGirl[];
  }

  interface AvailableGirl {
    id_girl: number;
  }
}

export {};
