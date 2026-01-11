import { Fragment, type ComponentChild, type VNode } from 'preact';
import { render } from 'preact-render-to-string';
import {
  Elements,
  type MyModule,
  Rarities,
  RoleId,
  RoleIds,
} from '../../common/types';
import { Async, Page, Style } from '../../utils';
import { ObjectDataPort } from '../../utils/storage';
import AddInfoCss from './add-info.css';
import aff_table from './aff-table.json';
import CompactGridCss from './compact-grid.css';
import FilterCss from './filter.css';
import SkipOutsideCss from './skip-outside.css';
import TooltipOnLockedGirlCss from './tooltip-on-locked-girl.css';
import xp_table from './xp-table.json';

const filterDataPort = new ObjectDataPort('pd_filter', {
  grade: 'all',
  sort: 'power',
  class: 'all',
  rarity: 'all',
  element: 'all',
  role: 'all',
  affection: 'all',
  level: 'all',
});

export const TeamEditingTweaksModule: MyModule<
  | 'compactGrid'
  | 'tooltipOnLocked'
  | 'overrideFilter'
  | 'lazyLoad'
  | 'showInfo'
  | 'fixBugs'
  | 'skipOutside'
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
      key: 'overrideFilter',
      default: true,
      label: 'Override Filter',
    },
    {
      key: 'lazyLoad',
      default: true,
      label: 'Do not load girl icons until it is shown',
    },
    {
      key: 'showInfo',
      default: true,
      label: 'Show Level, Grade, Class and Role',
    },
    {
      key: 'fixBugs',
      default: true,
      label: 'Fix game bugs',
    },
    {
      key: 'skipOutside',
      default: false,
      label:
        'Stop drawing icons outside the screen (improve speed but cause flickering during scrolling)',
    },
  ],
  async run(settings) {
    if (!Page.startsWith('/edit-penta-drill-team')) {
      return;
    }

    if (settings.showInfo) {
      Style.injectToHead(AddInfoCss);
    }
    if (settings.compactGrid) {
      Style.injectToHead(CompactGridCss);
    }
    if (settings.tooltipOnLocked) {
      Style.injectToHead(TooltipOnLockedGirlCss);
    }
    if (settings.overrideFilter) {
      Style.injectToHead(FilterCss);
    }
    if (settings.skipOutside) {
      Style.injectToHead(SkipOutsideCss);
    }

    await Async.afterDomContentLoaded();

    if (settings.overrideFilter) {
      void overrideFilter(settings);
    }

    await Async.afterGameScriptsRun();

    if (settings.showInfo || settings.fixBugs) {
      showInfo(settings);
    }
  },
};

function showInfo({
  showInfo,
  fixBugs,
}: {
  showInfo: boolean;
  fixBugs: boolean;
}) {
  const girlDataMap = new Map<number, AvailableGirl>();
  unsafeWindow.availableGirls!.forEach((e) => {
    girlDataMap.set(Number(e.id_girl), e);
  });

  if (showInfo) {
    const girls = document.querySelectorAll('.harem-panel [id_girl]');
    girls.forEach((e) => {
      const id = Number(e.getAttribute('id_girl'));
      appendInfo($(e), id);
    });
  }

  const container = document.querySelector('.change-team-panel.player-panel')!;

  if (showInfo) addInfoToHexagon(container);

  const updatingObserver = new MutationObserver((mutations) => {
    // after exchange girls
    mutations.forEach((mutation) => {
      const target = mutation.target as HTMLImageElement;
      updateInfo(target);
    });
  });

  const updatingObserverOptions = {
    attributes: true,
    attributeFilter: ['data-new-girl-tooltip'],
  };

  const observe = (container: Element) => {
    container
      .querySelectorAll('.team-member-container .team-member img')
      .forEach((e) => {
        updatingObserver.observe(e, updatingObserverOptions);
      });
  };

  if (showInfo) observe(container);

  const addingObserver = new MutationObserver((mutations) => {
    // after switch teams
    if (mutations.every((mutation) => mutation.addedNodes.length === 0)) return;
    // fix bugs
    if (fixBugs) {
      unsafeWindow.all_teams!.forEach((e) => {
        e.girls = e.girls.map((e) => ({
          ...e,
          ...girlDataMap.get(Number(e.id_girl))!,
        }));
      });
    }
    // add info
    if (showInfo) addInfoToHexagon(container);
    // re-observe
    if (showInfo) observe(mutations[0]?.target as Element);
  });

  addingObserver.observe(container, { childList: true });

  function addInfoToHexagon(container: Element) {
    container
      .querySelectorAll<HTMLImageElement>(
        '.team-member-container .team-member img',
      )
      .forEach((img) => {
        const id = getIdFromImg(img);
        const $container = $(img).closest('.team-member-container');
        appendInfo($container, id);
      });
  }

  function updateInfo(img: HTMLImageElement) {
    const id = getIdFromImg(img);
    const $container = $(img).closest('.team-member-container');
    appendInfo($container, id);
  }

  function appendInfo($container: JQuery<Element>, id: number | string) {
    const girl = girlDataMap.get(Number(id));
    if (girl == null) return;
    $container
      .find('.pdsim-level, .pdsim-grade, .pdsim-class, .pdsim-role')
      .remove();
    $container.append(getLevelHtml(girl));
    $container.append(getGradeHtml(girl));
    $container.append(getClassHtml(girl));
    $container.append(getRoleHtml(girl));
  }

  function getIdFromImg(img: HTMLImageElement) {
    return Number(
      img.getAttribute('src')?.match(/\/(\d+)\/(?:ico|grade_skins)/)?.[1],
    );
  }

  function getLevelHtml(girl: AvailableGirl): string {
    const level = girl.level;
    const capped = level >= 250 + 50 * girl.awakening_level;
    return render(
      <div className={`pdsim-level ${capped ? 'capped' : 'uncapped'}`}>
        {level}
      </div>,
    );
  }

  function getGradeHtml(girl: AvailableGirl): string {
    const orange = girl.graded;
    const green =
      girl.graded < girl.nb_grades &&
      girl.affection >= aff_table[girl.rarity][girl.graded + 1]!
        ? 1
        : 0;
    const grey = girl.nb_grades - orange - green;
    return render(
      <div className="pdsim-grade new_girl_tooltip">
        <div className="girl_tooltip_grade">
          {[
            ...Array<ComponentChild>(orange).fill(<g></g>),
            ...Array<ComponentChild>(green).fill(<g className="green"></g>),
            ...Array<ComponentChild>(grey).fill(<g className="grey"></g>),
          ]}
        </div>
      </div>,
    );
  }

  function getClassHtml(girl: AvailableGirl): string {
    const classId = girl.class;
    return render(
      <div className="pdsim-class" {...{ carac: classId }}>
        {' '}
      </div>,
    );
  }

  function getRoleHtml(girl: AvailableGirl): string {
    const id_role = girl.id_role;
    return render(
      <div className={`pdsim-role girl_role_${id_role}_icn`}></div>,
    );
  }
}

async function overrideFilter({ lazyLoad }: { lazyLoad: boolean }) {
  const design = unsafeWindow.GT?.design;
  if (design == null) throw new Error('window.GT.design not found');

  const availableGirls = unsafeWindow.availableGirls;
  if (availableGirls == null) throw new Error('availableGirls not found');

  const girlDataMap = new Map<number, AvailableGirl>();
  const girlDomMap = new Map<number, HTMLElement>();
  const girlIconMap = new Map<number, { img: HTMLImageElement; url: string }>();

  availableGirls.forEach((e) => {
    girlDataMap.set(Number(e.id_girl), e);
  });

  document
    .querySelectorAll<HTMLDivElement>('.harem-panel-girls > div[id_girl]')
    .forEach((e) => {
      const id_girl = e.getAttribute('id_girl')!;
      girlDomMap.set(Number(id_girl), e);
    });

  lazyLoad &&= typeof String.prototype.toImageUrl === 'function';

  if (lazyLoad) {
    document
      .querySelectorAll<HTMLDivElement>('.harem-panel-girls > div[id_girl]')
      .forEach((e) => {
        const id_girl = Number(e.getAttribute('id_girl'));
        e.style.display = 'none';
        const img = e.querySelector<HTMLImageElement>('img[girl-ico-src]');
        if (img != null) {
          girlIconMap.set(id_girl, {
            img,
            url: img.getAttribute('girl-ico-src')!,
          });
          img.removeAttribute('girl-ico-src');
        }
      });
  }

  type SortType =
    | 'power'
    | 'ego'
    | 'chance'
    | 'damage'
    | 'defense'
    | 'speed'
    | 'starting_mana'
    | 'mana'
    | 'level_asc'
    | 'level_desc'
    | 'xp'
    | 'affection';

  const girlSorter = availableGirls.map((e) => {
    const caracs = e.battle_caracs;

    const ego = caracs.ego;

    let damage = caracs.damage;
    if (e.id_role === RoleId.Dominator) damage *= 1.05;
    if (e.id_role === RoleId.Bugger) damage *= 0.8;
    damage = Math.ceil(damage);

    let defense = caracs.defense;
    if (e.id_role === RoleId.Masochist) defense *= 1.15;
    defense = Math.ceil(defense);

    const speed = caracs.speed;

    const mana = e.id_role === RoleId.Spermcaster ? 35 : 20;

    const requiredXp = xp_table[e.rarity][e.awakening_level]! - e.xp;
    const xp =
      requiredXp > 0
        ? requiredXp
        : e.awakening_level < 10
          ? Math.min(0, e.xp - xp_table[e.rarity][e.awakening_level + 1]!)
          : Number.MIN_SAFE_INTEGER;

    const requiredAffection =
      e.graded < e.nb_grades
        ? aff_table[e.rarity][e.graded + 1]! - e.affection
        : 0;
    const affection =
      requiredAffection > 0
        ? requiredAffection
        : e.graded + 1 < e.nb_grades
          ? Math.min(0, e.affection - aff_table[e.rarity][e.graded + 2]!)
          : Number.MIN_SAFE_INTEGER;

    const power = Math.ceil(ego + 7.5 * (damage + defense) + 0.625 * speed);

    return {
      id_girl: e.id_girl,
      dom: girlDomMap.get(e.id_girl)!,
      power,
      ego,
      chance: caracs.chance,
      damage,
      defense,
      speed: speed,
      starting_mana: caracs.mana_starting,
      mana,
      level_asc: -e.level,
      level_desc: e.level,
      xp,
      affection,
    };
  });

  const settings = await filterDataPort.read();

  const filterBox = (
    <div id="pdsim-filter-box" className="panel-filters">
      <div className="form-wrapper">
        <Selectric
          id="filter_grade"
          label={design.affection_category}
          selected={settings.grade}
        >
          <Fragment key="all">{design.selectors_All}</Fragment>
          <Fragment key="1">★1</Fragment>
          <Fragment key="3">★3</Fragment>
          <Fragment key="5">★5</Fragment>
          <Fragment key="6">★6</Fragment>
          <Fragment key="11">★5, ★6</Fragment>
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
          <Fragment key="level_asc">{design.Level} ▲</Fragment>
          <Fragment key="level_desc">{design.Level} ▼</Fragment>
          <span key="xp" className="clip">
            {design.XP} ({design.pop_description})
          </span>
          <span key="affection" className="clip">
            {design.Affection} ({design.pop_description})
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
    </div>
  );

  const $filterBox = $(render(filterBox));

  const onChange = () => {
    const getValue = (e: string) =>
      String($filterBox.find(`#filter_${e}`).val());
    const grade = getValue('grade');
    const sort = getValue('sort') as SortType;
    const classId = getValue('class');
    const rarity = getValue('rarity');
    const element = getValue('element');
    const role = getValue('role');
    const affection = getValue('affection');
    const level = getValue('level');

    void filterDataPort.write({
      grade,
      sort,
      class: classId,
      rarity,
      element,
      role,
      affection,
      level,
    });

    const isAffectionCapped = (girl: AvailableGirl) => {
      return (
        girl.graded >= girl.nb_grades ||
        girl.affection >= aff_table[girl.rarity][girl.graded + 1]!
      );
    };

    const isLevelCapped = (girl: AvailableGirl) => {
      return girl.level >= girl.awakening_level * 50 + 250;
    };

    const container =
      document.querySelector<HTMLElement>('.harem-panel-girls')!;
    const oldDisplay = container.style.display;
    try {
      container.style.display = 'none';
      document
        .querySelectorAll<HTMLDivElement>('.harem-panel-girls > div[id_girl]')
        .forEach((e) => {
          const id_girl = Number(e.getAttribute('id_girl'));
          const girl = girlDataMap.get(id_girl);
          if (girl == null) return;

          let matched = true;
          matched &&= element === 'all' || girl.element === element;
          matched &&= classId === 'all' || String(girl.class) === classId;
          matched &&= rarity === 'all' || girl.rarity === rarity;
          matched &&=
            grade === 'all' ||
            (grade === '11'
              ? girl.nb_grades >= 5
              : String(girl.nb_grades) === grade);
          matched &&= role === 'all' || String(girl.id_role) === role;
          matched &&=
            affection === 'all' ||
            (affection === 'capped') === isAffectionCapped(girl);
          matched &&=
            level === 'all' || (level === 'capped') === isLevelCapped(girl);

          if (matched && girlIconMap.has(id_girl)) {
            const { img, url } = girlIconMap.get(id_girl)!;
            img.setAttribute('girl-ico-src', url);
            img.setAttribute('src', url.toImageUrl('ico'));
            girlIconMap.delete(id_girl);
          }
          e.style.display = matched ? '' : 'none';
        });
      girlSorter.sort((x, y) => y[sort] - x[sort]);

      container.prepend(
        ...girlSorter
          .map((e) => e.dom)
          .filter((e) => e.style.display !== 'none'),
      );

      // very slow
      // girlSorter.forEach((e, i) => { e.dom.style.order = String(i); });
    } catch (_e) {
      //
    }
    container.style.display = oldDisplay;
  };

  const setting = {
    disableOnMobile: false,
    nativeOnMobile: false,
    maxHeight: 400,
  };
  [
    '#filter_grade',
    '#filter_sort',
    '#filter_element',
    '#filter_role',
    '#filter_class',
    '#filter_rarity',
    '#filter_affection',
    '#filter_level',
  ].forEach((e) => {
    $filterBox.find(e).selectric(setting).on('change', onChange);
  });
  $filterBox.find('#filter_sort').trigger('change');

  $filterBox.find('.shortcut-bar button.check-btn').each((_, _e) => {
    const e = _e as HTMLInputElement;
    const value = e.value;
    $(e).on('click', () => {
      $('select#filter_role')
        .prop('value', value)
        .selectric('refresh')
        .trigger('change');
    });
  });
  $('.panel-filters').after($filterBox);
}

type VNodeWithKey = Omit<VNode, 'key'> & { key: string };

function Selectric({
  id,
  label,
  selected,
  children,
}: {
  id: string;
  label: string | undefined;
  selected: string;
  children: (VNodeWithKey | VNodeWithKey[])[];
}) {
  return (
    <div className="form-control">
      <div className="select-group">
        <label className="head-group" htmlFor={id}>
          {label}
        </label>
        <select id={id} name={id} {...{ icon: 'down-arrow' }}>
          {children
            .flatMap((e) => e)
            .map((vNode) => (
              <option
                key={vNode.key}
                value={vNode.key}
                selected={vNode.key === selected}
              >
                {vNode}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
