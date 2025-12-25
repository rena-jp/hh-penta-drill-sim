import {} from './common/global';
import { type MyModule } from './common/types';
import * as Modules from './modules';
import { Async } from './utils';

void (async function () {
  'use strict';

  await Async.afterJQueryLoaded();

  const moduleList = Object.values(Modules) as MyModule<string>[];

  // Import HHPlusPlus
  const HHPlusPlus = await Async.importHHPlusPlusConfig();
  if (HHPlusPlus) {
    if (registerModules()) return; // End
  }

  moduleList.forEach((module) => {
    if (module.default) {
      const settings =
        module.settings?.reduce(
          (p, c) => ((p[c.key] = c.default), p),
          {} as Record<string, boolean>,
        ) ?? {};
      void module.run(settings);
    }
  });

  return; // End

  function registerModules() {
    // Import modules from HHPlusPlus
    const { hhPlusPlusConfig } = window;
    if (!hhPlusPlusConfig) return false;

    // Register My Modules
    const GROUP_KEY = 'pdsim';
    hhPlusPlusConfig.registerGroup({ key: GROUP_KEY, name: `PD Sim` });

    moduleList.forEach((module) => {
      if (!module || !module.run) return; // Skip invalid module

      hhPlusPlusConfig.registerModule({
        group: GROUP_KEY,
        configSchema: {
          baseKey: module.key,
          label: module.label,
          default: module.default ?? true,
          subSettings: module.settings,
        } as const,
        hasRun: false,
        run(subSettings) {
          if (!this.hasRun) {
            const maybePromise = module.run(subSettings);
            this.hasRun = true;
            void Promise.resolve(maybePromise).then((result) => {
              this.hasRun = result !== false;
            });
          }
        },
        tearDown() {
          if (this.hasRun && module.undo) {
            this.hasRun = module.undo() === false;
          }
        },
        // updateSubSetting(subKey, value) { }, // No one uses it
      });
    });

    hhPlusPlusConfig.loadConfig();
    hhPlusPlusConfig.runModules();

    return true;
  }
})();
