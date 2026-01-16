import { Fragment } from 'preact';
import { render } from 'preact-render-to-string';
import { Elements, RoleIds, Rarities } from '../../common/types';
import { Selectric } from '../../components/selectric';
import { ObjectDataPort } from '../../utils/storage';

export const FilterList = [
  'grade',
  'sort',
  'element',
  'role',
  'class',
  'rarity',
  'affection',
  'level',
] as const;

export const SortList = [
  'power',
  'ego',
  'chance',
  'damage',
  'defense',
  'starting_mana',
  'mana',
  'speed',
  'level_asc',
  'level_desc',
  'xp',
  'xp_asc',
  'xp_desc',
  'affection',
  'affection_asc',
  'affection_desc',
] as const;

export type SortType = (typeof SortList)[number];

const defaultSettings = {
  grade: 'all',
  sort: 'power',
  class: 'all',
  rarity: 'all',
  element: 'all',
  role: 'all',
  affection: 'all',
  level: 'all',
  open: false,
};

export type FilterSettings = typeof defaultSettings;

const filterDataPort = new ObjectDataPort('pd_filter', defaultSettings);

type Callback = (settings: FilterSettings) => void;

export class FilterBox {
  private callbacks: Callback[];
  private initialSettings: Promise<FilterSettings>;
  private $filterBox: JQuery;
  public defaultSettings: FilterSettings;
  public constructor() {
    this.callbacks = [];
    this.$filterBox = null!;
    this.initialSettings = filterDataPort.read();
    this.defaultSettings = { ...defaultSettings };
  }

  public replaceGameFilter = async (): Promise<void> => {
    const settings = await this.initialSettings;
    if (settings.sort === 'xp') settings.sort = 'xp_desc';
    if (settings.sort === 'affection') settings.sort = 'affection_desc';

    const $filterBox = $(getFilterBoxHtml(settings));
    this.$filterBox = $filterBox;

    const options = {
      disableOnMobile: false,
      nativeOnMobile: false,
    };

    FilterList.forEach((e) => {
      $filterBox.find(`#filter_${e}`).selectric(options);
    });

    $filterBox.find('.shortcut-bar button.check-btn').each((_, _e) => {
      const e = _e as HTMLInputElement;
      const value = e.value;
      $(e).on('click', () => {
        $filterBox
          .find('#filter_role')
          .prop('value', value)
          .selectric('refresh')
          .trigger('change');
      });
    });

    if (settings.open) $filterBox.addClass('visible-filters-panel');

    FilterList.forEach((e) => {
      $filterBox.find(`#filter_${e}`).on('change', this.triggerChangeEvent);
    });

    $('.panel-filters').after($filterBox);

    new MutationObserver(() => {
      const settings = this.getSettings();
      void filterDataPort.write(settings);
    }).observe($filterBox.get(0)!, {
      attributes: true,
      attributeFilter: ['class'],
    });
  };

  private triggerChangeEvent = () => {
    const settings = this.getSettings();
    void filterDataPort.write(settings);
    this.callbacks.forEach((f) => {
      try {
        f({ ...settings });
      } catch (e) {
        console.error(e);
      }
    });
  };

  public refresh = async (): Promise<void> => {
    await this.initialSettings;
    this.$filterBox.find('#filter_sort').trigger('change');
  };

  public getSettings = (): FilterSettings => {
    return getFilterSettings(this.$filterBox);
  };

  public onChange = (callback: Callback): void => {
    this.callbacks.push(callback);
  };
}

function getFilterSettings($filterBox: JQuery<Element>): FilterSettings {
  const getValue = (e: string) => String($filterBox.find(`#filter_${e}`).val());

  const settings = {} as Partial<FilterSettings>;
  (
    [
      'grade',
      'sort',
      'class',
      'rarity',
      'element',
      'role',
      'affection',
      'level',
    ] as const
  ).forEach((e) => {
    settings[e] = getValue(e);
  });
  settings.open = $filterBox.hasClass('visible-filters-panel');

  return settings as FilterSettings;
}

function getFilterBoxHtml(settings: FilterSettings) {
  if (unsafeWindow.GT?.design == null) {
    console.error('window.GT.design not found');
  }
  const design = unsafeWindow.GT?.design ?? {};

  return render(
    <div id="pdsim-filter-box" className="panel-filters">
      <div className="form-wrapper">
        <Selectric
          id="filter_grade"
          label={design.affection_category}
          selected={settings.grade}
        >
          <Fragment key="all">{design.selectors_All}</Fragment>
          <Fragment key="1">1 ★</Fragment>
          <Fragment key="3">3 ★</Fragment>
          <Fragment key="5">5 ★</Fragment>
          <Fragment key="6">6 ★</Fragment>
          <Fragment key="11">5 ★, 6 ★</Fragment>
        </Selectric>

        <Selectric
          id="filter_sort"
          label={design.haremdex_sort_by}
          selected={settings.sort}
        >
          <Fragment key="power">
            <span className="girl-power-icon"></span>
            {design.caracs_sum}
          </Fragment>
          <span key="ego" {...{ carac: 'ego' }}>
            {design.carac_ego}
          </span>
          <span key="chance" {...{ carac: 'chance' }}>
            {design.carac_harmony}
          </span>
          <span key="damage" {...{ carac: 'damage' }}>
            {design.damage}
          </span>
          <span key="defense" {...{ carac: 'defense' }}>
            {design.carac_def}
          </span>
          <span key="starting_mana" {...{ carac: 'mana' }}>
            {design.carac_starting_mana}
          </span>
          <span key="mana" {...{ carac: 'mana-generation' }}>
            {design.carac_mana_generation}
          </span>
          <span key="speed" {...{ carac: 'speed' }}>
            {design.pvp_battle_speed}
          </span>
          <Fragment key="level_asc">▲ {design.Level}</Fragment>
          <Fragment key="level_desc">▼ {design.Level}</Fragment>
          <span key="xp_asc" className="clip">
            ▲ {design.XP} ({design.pop_description})
          </span>
          <span key="xp_desc" className="clip">
            ▼ {design.XP} ({design.pop_description})
          </span>
          <span key="affection_asc" className="clip">
            ▲ {design.Affection} ({design.pop_description})
          </span>
          <span key="affection_desc" className="clip">
            ▼ {design.Affection} ({design.pop_description})
          </span>
        </Selectric>

        <Selectric
          id="filter_element"
          label={design.element}
          selected={settings.element}
        >
          <Fragment key="all">{design.selectors_All}</Fragment>
          {Elements.map((e) => (
            <Fragment key={e}>
              <span className={`pdsim-selectric-icon ${e}_element_icn`}></span>
              {design[`${e}_flavor_element`]}
            </Fragment>
          ))}
        </Selectric>

        <Selectric
          id="filter_role"
          label={design.girl_role}
          selected={settings.role}
        >
          <Fragment key="all">{design.selectors_All}</Fragment>
          {RoleIds.map((e) => (
            <Fragment key={e}>
              <span
                className={`pdsim-selectric-icon girl_role_${e}_icn`}
                {...{ 'role-tooltip': e }}
              ></span>
              {design[`girl_role_${e}_name`]}
            </Fragment>
          ))}
        </Selectric>

        <Selectric
          id="filter_class"
          label={design.mythic_equipment_class}
          selected={settings.class}
        >
          <Fragment key="all">{design.selectors_All}</Fragment>
          <span key="1" {...{ carac: '1' }}>
            {design.clubup_hardcore_stats_bonus}
          </span>
          <span key="2" {...{ carac: '2' }}>
            {design.clubup_charm_stats_bonus}
          </span>
          <span key="3" {...{ carac: '3' }}>
            {design.clubup_know_how_stats_bonus}
          </span>
        </Selectric>

        <Selectric
          id="filter_rarity"
          label={design.selectors_Rarity}
          selected={settings.rarity}
        >
          <Fragment key="all">{design.selectors_All}</Fragment>
          {Rarities.map((e) => (
            <Fragment key={e}>
              <span
                className={`pdsim-selectric-icon rarity-background ${e}`}
              ></span>
              {design[`girls_rarity_${e}`]}
            </Fragment>
          ))}
        </Selectric>

        <Selectric
          id="filter_affection"
          label={design.affection_cap}
          selected={settings.affection}
        >
          <Fragment key="all">{design.selectors_All}</Fragment>
          <Fragment key="capped">{design.capped}</Fragment>
          <Fragment key="uncapped">{design.uncapped}</Fragment>
        </Selectric>

        <Selectric
          id="filter_level"
          label={design.level_cap}
          selected={settings.level}
        >
          <Fragment key="all">{design.selectors_All}</Fragment>
          <Fragment key="capped">{design.capped}</Fragment>
          <Fragment key="uncapped">{design.uncapped}</Fragment>
        </Selectric>
      </div>

      <div className="checkbox-group shortcut-bar">
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
}
