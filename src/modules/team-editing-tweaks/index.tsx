import { render } from 'preact-render-to-string';
import {
  type MyModule,
  Elements,
  SkillTypeFromElement,
  SkillNameFromSkillType,
  RoleIds,
} from '../../common/types';
import { Async, Page, Style } from '../../utils';
import CompactGridCss from './compact-grid.css';
import TooltipOnLockedGirlCss from './tooltip-on-locked-girl.css';
import ShortcutBarCss from './shortcut-bar.css';

export const TeamEditingTweaksModule: MyModule<
  'compactGrid' | 'tooltipOnLocked' | 'shortcutBar'
> = {
  key: 'TeamEditingTweaksModule',
  label: 'Team editing tweaks',
  default: true,
  settings: [
    { key: 'compactGrid', default: true, label: 'Compact grid' },
    {
      key: 'tooltipOnLocked',
      default: true,
      label: 'Show tooltip on locked girl',
    },
    {
      key: 'shortcutBar',
      default: true,
      label: 'Add shortcut bar',
    },
  ],
  async run(settings) {
    if (
      !Page.startsWith('/edit-penta-drill-team') &&
      !Page.startsWith('/edit-labyrinth-team.html')
    )
      return;

    if (settings.compactGrid) {
      Style.injectToHead(CompactGridCss);
    }
    if (settings.tooltipOnLocked) {
      Style.injectToHead(TooltipOnLockedGirlCss);
    }
    if (settings.shortcutBar) {
      Style.injectToHead(ShortcutBarCss);
    }

    await Async.afterDomContentLoaded();

    if (settings.shortcutBar) {
      const girlMap = {} as Record<number, AvailableGirl>;
      const availableGirls = window.availableGirls!;
      availableGirls.forEach((e) => {
        girlMap[e.id_girl] = e;
      });

      const html = render(
        <div id="shortcut-bar-box" className="checkbox-group">
          <div className="shortcut-bar skill">
            <button
              className="check-btn element-state"
              value="all"
              {...{ tooltip: 'All' }}
            ></button>
            {Elements.map((e, i) => {
              const skillType = SkillTypeFromElement[e];
              const skillName = SkillNameFromSkillType[skillType];
              return (
                <button
                  key={i}
                  className="check-btn element-state"
                  value={e}
                  {...{ tooltip: skillName }}
                >
                  <span className={`role-icn ${skillType}_icn`}></span>
                </button>
              );
            })}
          </div>
          <div className="shortcut-bar role">
            <button
              className="check-btn element-state"
              value="all"
              {...{ tooltip: 'All Roles' }}
            ></button>
            {RoleIds.map((roleId, i) => (
              <button
                key={i}
                className="check-btn element-state"
                value={roleId}
                {...{ 'role-tooltip': roleId }}
              >
                <span className={`role-icn girl_role_${roleId}_icn`}></span>
              </button>
            ))}
          </div>
        </div>,
      );

      const panel = $(html);
      panel.insertAfter('.change-team-panel.harem-panel');
      panel.find('.role button.check-btn').each((_, _e) => {
        const e = _e as HTMLInputElement;
        const value = e.value;
        $(e).on('click', () => {
          let $roleFilter = $('select#filter_role');
          if ($roleFilter.length === 0) $roleFilter = $('select[name="role"]');
          $roleFilter.prop('value', value).selectric('refresh').change();
        });
      });
      panel.find('.skill button.check-btn').each((_, _e) => {
        const e = _e as HTMLInputElement;
        const value = e.value;
        $(e).on('click', () => {
          let $elementFilter = $('select#filter_element');
          if ($elementFilter.length === 0)
            $elementFilter = $('select[name="element"]');
          $elementFilter.prop('value', value).selectric('refresh').change();
          const $skillTierFilter = $('select#filter_skill_tier');
          if (value === 'all') {
            $skillTierFilter.prop('value', 'all').selectric('refresh').change();
          } else {
            $skillTierFilter.prop('value', 5).selectric('refresh').change();
          }
        });
      });
    }
  },
};
