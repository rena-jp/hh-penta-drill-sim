import { type ComponentChild } from 'preact';
import { render } from 'preact-render-to-string';
import { type MyModule, RoleId } from '../../common/types';
import { Async, Page, Style } from '../../utils';
import AddInfoCss from './add-info.css';
import aff_table from './aff-table.json';
import CompactGridCss from './compact-grid.css';
import { FilterBox, type FilterSettings, type SortType } from './filter-box';
import FilterCss from './filter-box.css';
import SkipOutsideCss from './skip-outside.css';
import TooltipOnLockedGirlCss from './tooltip-on-locked-girl.css';
import xp_table from './xp-table.json';

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

    await Async.afterBodyLoaded();

    let inited = false;

    const filterBox = new FilterBox();

    const availableGirls = unsafeWindow.availableGirls ?? [];
    if (availableGirls.length === 0) console.error('availableGirls not found');

    const filterGirls = createFilterGirls(availableGirls);

    const girlDataMap = new Map<number, FilterGirl>(
      filterGirls.map((e) => [e.id_girl, e]),
    );

    const unloadedIconMap = new Map() as UnloadedIconMap;

    if (
      settings.overrideFilter &&
      settings.lazyLoad &&
      typeof String.prototype.toImageUrl === 'function'
    ) {
      filterGirls.forEach((e) => {
        e.visible = false;
      });
      document
        .querySelectorAll<HTMLDivElement>('.harem-panel-girls > div[id_girl]')
        .forEach((e) => {
          const id_girl = Number(e.getAttribute('id_girl')!);
          unloadGirlIcon(unloadedIconMap, id_girl, e);
        });
    }

    const hexagonContainer = document.querySelector(
      '.change-team-panel.player-panel',
    )!;

    const hexagonLineObserver = new MutationObserver((m) => {
      if (settings.fixBugs) fixTeamData(girlDataMap);
      m.forEach((e) => {
        const target = e.target as HTMLElement;
        const id = Number(target.dataset.girlId);
        loadHexagonGirlIcon(unloadedIconMap, id);
        onGirlChanged(target);
      });
    });

    const observeHexagonLine = () => {
      hexagonContainer
        .querySelectorAll('.team-member-container')
        .forEach((e) => {
          hexagonLineObserver.observe(e, {
            attributes: true,
            attributeFilter: ['data-girl-id'],
          });
        });
    };

    const teamObserver = new MutationObserver(() => {
      onCurrentTeamChanged();
      observeHexagonLine();
    });

    teamObserver.observe(hexagonContainer, { childList: true });

    if (settings.overrideFilter) await filterBox.replaceGameFilter();

    let currentFilterSettings: FilterSettings = filterBox.defaultSettings;

    await Async.afterGameScriptsRun();

    if (settings.lazyLoad) {
      document
        .querySelectorAll<HTMLDivElement>('.harem-panel-girls > div[id_girl]')
        .forEach((e) => {
          const id_girl = Number(e.getAttribute('id_girl')!);
          fixGirlIcon(unloadedIconMap, id_girl);
        });
    }

    if (settings.overrideFilter) {
      filterBox.onChange((e) => onFilterChanged(e));
      void filterBox.refresh();
    }

    if (!inited) onCurrentTeamChanged();

    if (settings.showInfo)
      addInfoToGridSlots(girlDataMap, currentFilterSettings);

    function onFilterChanged(filterSettings: FilterSettings) {
      currentFilterSettings = filterSettings;
      if (settings.overrideFilter) {
        applyFilterToGridSlots(filterSettings, filterGirls, unloadedIconMap);
        applyFilterToHexagonSlots(filterSettings, girlDataMap);
      }
    }

    function onCurrentTeamChanged() {
      inited = true;
      if (settings.fixBugs) fixTeamData(girlDataMap);
      hexagonContainer
        .querySelectorAll<HTMLImageElement>('.team-member-container')
        .forEach((e) => {
          onGirlChanged(e);
        });
    }

    function onGirlChanged(container: HTMLElement) {
      const id = Number(container.dataset.girlId);
      const girl = girlDataMap.get(id);
      if (settings.showInfo) addInfo(container, girl);
      if (settings.overrideFilter) {
        applyFilterToHexagonSlot(currentFilterSettings, container, girl);
      }
    }
  },
};

function applyFilterToGridSlots(
  settings: FilterSettings,
  filterGirls: FilterGirl[],
  unloadedIconMap: UnloadedIconMap,
) {
  const grid = document.querySelector<HTMLElement>('.harem-panel-girls')!;
  const oldDisplay = grid.style.display;
  grid.style.display = 'none';
  try {
    filterGirls.forEach((e) => {
      const id_girl = e.id_girl;
      const matched = matchesFilter(settings, e.availableGirl);
      if (matched && unloadedIconMap.has(id_girl)) {
        loadGirlIcon(unloadedIconMap, id_girl);
      }
      e.visible = matched;
      e.dom.style.display = matched ? '' : 'none';
      addInfoToGridSlot(e, settings, e.dom);
    });

    const sort = settings.sort as SortType;
    filterGirls.sort((x, y) => y[sort] - x[sort]);

    grid.prepend(
      ...filterGirls
        .map((e) => e.dom)
        .filter((e) => e.style.display !== 'none'),
    );
  } catch (_e) {
    //
  }
  grid.style.display = oldDisplay;
}

function applyFilterToHexagonSlots(
  settings: FilterSettings,
  girlDataMap: Map<number, FilterGirl>,
) {
  document
    .querySelectorAll<HTMLImageElement>(
      '.change-team-panel.player-panel .team-member-container .team-member img',
    )
    .forEach((img) => {
      const id = getIdFromImg(img);
      const girl = girlDataMap.get(id);
      const container = img.closest<HTMLElement>('.team-member-container');
      if (container == null) return;
      applyFilterToHexagonSlot(settings, container, girl);
    });
}

function applyFilterToHexagonSlot(
  settings: FilterSettings,
  container: HTMLElement,
  girl: FilterGirl | undefined,
) {
  if (girl != null) {
    const matches = matchesFilter(settings, girl.availableGirl);
    container.style.opacity = matches ? '1' : '0.5';
  } else {
    container.style.opacity = '1';
  }
}

function addInfoToGridSlots(
  girlDataMap: Map<number, FilterGirl>,
  filter: FilterSettings,
) {
  const girls = document.querySelectorAll('.harem-panel [id_girl]');
  girls.forEach((e) => {
    const id = e.getAttribute('id_girl');
    const girl = girlDataMap.get(Number(id));
    addInfoToGridSlot(girl, filter, e);
  });
}

function addInfoToGridSlot(
  girl: FilterGirl | undefined,
  filter: FilterSettings,
  slot: Element,
) {
  addInfo(slot, girl?.visible ? girl : undefined, filter);
}

function fixTeamData(girlDataMap: Map<number, FilterGirl>) {
  unsafeWindow.all_teams!.forEach((e) => {
    e.girls = e.girls.map((e) => ({
      ...e,
      ...girlDataMap.get(Number(e.id_girl))?.availableGirl,
    }));
  });
}

type UnloadedIconMap = Map<number, { img: HTMLImageElement; url: string }>;

function unloadGirlIcon(
  unloadedIconMap: UnloadedIconMap,
  id_girl: number,
  element: HTMLElement,
) {
  const img = element.querySelector<HTMLImageElement>('img[girl-ico-src]');
  if (img == null) return;
  element.style.display = 'none';
  const url = img.getAttribute('girl-ico-src')!;
  unloadedIconMap.set(id_girl, { img, url });
  img.removeAttribute('girl-ico-src');
}

function fixGirlIcon(unloadedIconMap: UnloadedIconMap, id_girl: number) {
  const iconData = unloadedIconMap.get(id_girl);
  if (iconData == null) return;
  const { img, url } = iconData;
  img.setAttribute('girl-ico-src', url);
}

function loadGirlIcon(unloadedIconMap: UnloadedIconMap, id_girl: number) {
  const iconData = unloadedIconMap.get(id_girl);
  if (iconData == null) return;
  const { img, url } = iconData;
  const icoUrl = url.toImageUrl('ico');
  img.setAttribute('girl-ico-src', url);
  img.setAttribute('src', icoUrl);
  unloadedIconMap.delete(id_girl);
}

function loadHexagonGirlIcon(
  unloadedIconMap: UnloadedIconMap,
  id_girl: number,
) {
  const iconData = unloadedIconMap.get(id_girl);
  if (iconData == null) return;
  const { img, url } = iconData;
  const icoUrl = url.toImageUrl('ico');
  img.setAttribute('girl-ico-src', url);
  img.setAttribute('src', icoUrl);
  unloadedIconMap.delete(id_girl);
  const hexagonImg = document.querySelector(`[data-girl-id="${id_girl}"] img`);
  if (hexagonImg != null) {
    hexagonImg.setAttribute('girl-ico-src', url);
    hexagonImg.setAttribute('src', icoUrl);
  }
}

function addInfo(
  container: Element,
  girl: FilterGirl | undefined,
  filter?: FilterSettings,
) {
  container
    .querySelectorAll(
      '.pdsim-level, .pdsim-grade, .pdsim-class, .pdsim-role, .pdsim-filter-value',
    )
    .forEach((e) => e.remove());
  if (girl == null) return;
  container.insertAdjacentHTML('beforeend', getLevelHtml(girl));
  const sortType = filter?.sort as SortType | undefined;
  container.insertAdjacentHTML('beforeend', getFilterValueHtml(girl, sortType));
  container.insertAdjacentHTML('beforeend', getClassHtml(girl));
  container.insertAdjacentHTML('beforeend', getRoleHtml(girl));
}

function getIdFromImg(img: HTMLImageElement) {
  return Number(
    img.getAttribute('src')?.match(/\/(\d+)\/(?:ico|grade_skins)/)?.[1],
  );
}

function getLevelHtml(girl: FilterGirl): string {
  const { level, awakening_level } = girl.availableGirl;
  const capped = level >= 250 + 50 * awakening_level;
  const classList = ['pdsim-level', capped ? 'capped' : 'uncapped'];
  return render(<div className={classList.join(' ')}>{level}</div>);
}

function _getGradeHtml(girl: FilterGirl): string {
  const { graded, nb_grades, rarity, affection } = girl.availableGirl;
  const orange = graded;
  const green =
    graded < nb_grades && affection >= aff_table[rarity][graded + 1]! ? 1 : 0;
  const grey = nb_grades - orange - green;
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

function getGradeHtmlV2(girl: FilterGirl): string {
  const { graded, nb_grades, rarity, affection } = girl.availableGirl;
  const orange = graded;
  const green =
    graded < nb_grades && affection >= aff_table[rarity][graded + 1]! ? 1 : 0;
  const grey = nb_grades - orange - green;
  return render(
    <div className="pdsim-grade bar-section">
      <div className="top-text">
        <div className="girl_quests">
          {[
            ...Array<ComponentChild>(orange).fill(<g></g>),
            ...Array<ComponentChild>(green).fill(<g className="green"></g>),
            ...Array<ComponentChild>(grey).fill(<g className="grey"></g>),
          ]}
        </div>
      </div>
    </div>,
  );
}

function getClassHtml(girl: FilterGirl): string {
  const classId = girl.availableGirl.class;
  return render(
    <div className="pdsim-class" {...{ carac: classId }}>
      {' '}
    </div>,
  );
}

function getRoleHtml(girl: FilterGirl): string {
  const id_role = girl.availableGirl.id_role;
  const classList = [`pdsim-role girl_role_${id_role}_icn`];
  return render(<div className={classList.join(' ')}></div>);
}

function getFilterValueHtml(girl: FilterGirl, key?: SortType): string {
  switch (key) {
    case 'xp':
    case 'xp_asc':
    case 'xp_desc':
      return render(
        <div className="pdsim-filter-value">
          {Math.max(0, girl.xp_desc).toLocaleString()}
        </div>,
      );
    case 'affection':
    case 'affection_asc':
    case 'affection_desc':
      return render(
        <div className="pdsim-filter-value">
          {Math.max(0, girl.affection_desc).toLocaleString()}
        </div>,
      );
    case 'power':
      return render(
        <div className="pdsim-filter-value">
          <span className="girl-power-icon"></span>
          {girl.power.toLocaleString()}
        </div>,
      );
    case 'ego':
      return render(
        <div className="pdsim-filter-value">
          <span {...{ carac: 'ego' }}>{girl.ego.toLocaleString()}</span>
        </div>,
      );
    case 'chance':
      return render(
        <div className="pdsim-filter-value">
          <span {...{ carac: 'chance' }}>{girl.chance.toLocaleString()}</span>
        </div>,
      );
    case 'damage':
      return render(
        <div className="pdsim-filter-value">
          <span {...{ carac: 'damage' }}>{girl.damage.toLocaleString()}</span>
        </div>,
      );
    case 'defense':
      return render(
        <div className="pdsim-filter-value">
          <span {...{ carac: 'defense' }}>{girl.defense.toLocaleString()}</span>
        </div>,
      );
    case 'starting_mana':
      return render(
        <div className="pdsim-filter-value">
          <span {...{ carac: 'mana' }}>
            {girl.starting_mana.toLocaleString()}
          </span>
        </div>,
      );
    case 'mana':
      return render(
        <div className="pdsim-filter-value">
          <span {...{ carac: 'mana-generation' }}>
            {girl.mana.toLocaleString()}
          </span>
        </div>,
      );
    case 'speed':
      return render(
        <div className="pdsim-filter-value">
          <span key="speed" {...{ carac: 'speed' }}>
            {girl.speed.toLocaleString()}
          </span>
        </div>,
      );
    default:
      return getGradeHtmlV2(girl);
  }
}

type FilterGirl = {
  id_girl: number;
  availableGirl: AvailableGirl;
  dom: HTMLElement;
  visible: boolean;
} & Record<SortType, number>;

function createFilterGirls(availableGirls: AvailableGirl[]): FilterGirl[] {
  const girlDomMap = new Map<number, HTMLElement>();
  document
    .querySelectorAll<HTMLDivElement>('.harem-panel-girls > div[id_girl]')
    .forEach((e) => {
      const id_girl = e.getAttribute('id_girl')!;
      girlDomMap.set(Number(id_girl), e);
    });

  return availableGirls.map((girl) => {
    const caracs = girl.battle_caracs;

    const ego = caracs.ego;

    let damage = caracs.damage;
    if (girl.id_role === RoleId.Dominator) damage *= 1.05;
    if (girl.id_role === RoleId.Bugger) damage *= 0.8;
    damage = Math.ceil(damage);

    let defense = caracs.defense;
    if (girl.id_role === RoleId.Masochist) defense *= 1.15;
    defense = Math.ceil(defense);

    const mana = girl.id_role === RoleId.Spermcaster ? 35 : 20;

    const speed = caracs.speed;

    const requiredXp = xp_table[girl.rarity][girl.awakening_level]! - girl.xp;

    const xp =
      requiredXp > 0
        ? requiredXp
        : girl.awakening_level < 10
          ? Math.min(
              0,
              girl.xp - xp_table[girl.rarity][girl.awakening_level + 1]!,
            )
          : Number.MIN_SAFE_INTEGER;

    const requiredAffection =
      girl.graded < girl.nb_grades
        ? aff_table[girl.rarity][girl.graded + 1]! - girl.affection
        : 0;
    const affection =
      requiredAffection > 0
        ? requiredAffection
        : girl.graded + 1 < girl.nb_grades
          ? Math.min(
              0,
              girl.affection - aff_table[girl.rarity][girl.graded + 2]!,
            )
          : Number.MIN_SAFE_INTEGER;

    const power = Math.ceil(ego + 7.5 * (damage + defense) + 0.625 * speed);

    return {
      id_girl: girl.id_girl,
      availableGirl: girl,
      dom: girlDomMap.get(girl.id_girl)!,
      power,
      ego,
      chance: caracs.chance,
      damage,
      defense,
      speed,
      starting_mana: caracs.mana_starting,
      mana,
      level_asc: -girl.level,
      level_desc: girl.level,
      xp,
      xp_asc: -xp,
      xp_desc: xp,
      affection,
      affection_asc: -affection,
      affection_desc: affection,
      visible: true,
    };
  });
}

function matchesFilter(settings: FilterSettings, girl: AvailableGirl) {
  const {
    grade,
    element,
    role,
    class: classId,
    rarity,
    affection,
    level,
  } = settings;

  let matched = true;
  matched &&=
    grade === 'all' ||
    (grade === '11' ? girl.nb_grades >= 5 : String(girl.nb_grades) === grade);
  matched &&= element === 'all' || girl.element === element;
  matched &&= role === 'all' || String(girl.id_role) === role;
  matched &&= classId === 'all' || String(girl.class) === classId;
  matched &&= rarity === 'all' || girl.rarity === rarity;
  matched &&=
    affection === 'all' || (affection === 'capped') === isAffectionCapped(girl);
  matched &&= level === 'all' || (level === 'capped') === isLevelCapped(girl);
  return matched;

  function isAffectionCapped(girl: AvailableGirl) {
    return (
      girl.graded >= girl.nb_grades ||
      girl.affection >= aff_table[girl.rarity][girl.graded + 1]!
    );
  }

  function isLevelCapped(girl: AvailableGirl) {
    return girl.level >= girl.awakening_level * 50 + 250;
  }
}
