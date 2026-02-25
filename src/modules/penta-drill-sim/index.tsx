import { render } from 'preact-render-to-string';
import {
  getTeamsFromFighters,
  getTeamsFromGamePlayer,
} from '../../common/data';
import type {
  MyModule,
  PentaDrillBattleResponseData,
  Player,
} from '../../common/types';
import { simulatePentaDrill } from '../../simulator/simulator';
import { validatePentaDrill } from '../../simulator/validator';
import { Async, Color, Page, Style } from '../../utils';
import css from './style.css';

export const PentaDrillSimModule: MyModule<
  'arena' | 'preBattle' | 'heavy' | 'debugLog'
> = {
  key: 'PentaDrillSimModule',
  label: 'Penta Drill Sim',
  default: true,
  settings: [
    { key: 'arena', default: true, label: 'Run on table page' },
    { key: 'preBattle', default: true, label: 'Run on pre-battle page' },
    { key: 'heavy', default: false, label: 'Heavy simulation (slow)' },
    // { key: 'developer', default: false, label: 'Developer mode' },
    {
      key: 'debugLog',
      default: false,
      label: 'Output debug log to console',
    },
  ],
  async run(settings) {
    if (settings.arena && Page.startsWith('/penta-drill-arena.html')) {
      Style.injectToHead(css);
      await Async.afterBodyLoaded();

      const { player_datas, opponents_list } = unsafeWindow;
      if (player_datas == null || opponents_list == null) {
        console.error('Not found', { player_datas, opponents_list });
        return;
      }

      let hero_fighter = player_datas;
      let opponents = opponents_list;
      let refreshed = true;

      $(document).ajaxComplete((_event, jqXHR, ajaxOptions) => {
        const { url, data } = ajaxOptions;
        if (!url?.startsWith('/ajax.php')) return;
        if (
          typeof data === 'string' &&
          data.includes('action=penta_drill_arena_reload')
        ) {
          const { battle_data } = jqXHR.responseJSON as {
            battle_data: {
              hero_fighter: Player;
              opponents: { player: Player }[];
            };
          };
          ({ hero_fighter, opponents } = battle_data);
          refreshed = true;
        }
      });

      const numSimulation = settings.heavy ? 300 : 100;
      const update = () => {
        refreshed = false;
        opponents.forEach((opponent) => {
          void Async.run(async () => {
            const heroTeams = getTeamsFromGamePlayer(hero_fighter);
            const opponentTeams = getTeamsFromGamePlayer(opponent.player);
            const expected = simulatePentaDrill(
              heroTeams,
              opponentTeams,
              numSimulation,
            );

            await Async.afterGameScriptsRun();

            const $box = createSimResultsBox(expected);
            let $button = $(
              `a[href$="id_opponent=${opponent.player.id_fighter}"]`,
            );
            if ($button.length === 0) {
              $button = $(
                `a[href*="id_opponent=${opponent.player.id_fighter}&"]`,
              );
            }
            $button.parent().parent().append($box);

            await Async.afterThirdpartyScriptsRun();

            $(() => {
              if ($box.parent().find('#perform_opponent').length > 0) {
                $box.find('.pdsim-right').css('right', '6%');
                $box.find('.pdsim-left').css('left', '6%');
              }
            });
          });
        });
      };

      const opponentContainer = document.querySelector('.opponents-container');
      if (opponentContainer != null) {
        if (document.querySelectorAll('.opponent-info-container').length > 0) {
          update();
        }
        new MutationObserver(() => {
          if (refreshed) {
            update();
          }
        }).observe(opponentContainer, { childList: true });
      }

      /*
      if (settings.developer) {
        await Async.afterGameScriptsRun();

        $('.player-container .description-container')
          .append(
            render(
              <img
                src="https://hh2.hh-content.com/design/ic_books_gray.svg"
                style={{
                  position: 'absolute',
                  top: '0.6rem',
                  right: '0.6rem',
                  width: '2.6rem',
                  height: '2.6rem',
                  cursor: 'pointer',
                }}
              />,
            ),
          )
          .on('click', () => {
            void Async.run(async () => {
              // TODO
            });
          });
      }
      */
    }

    if (Page.startsWith('/penta-drill-pre-battle')) {
      Style.injectToHead(css);
      await Async.afterBodyLoaded();

      if (settings.preBattle) {
        const { hero_fighter, opponent_fighter } = unsafeWindow;
        if (hero_fighter == null || opponent_fighter == null) {
          console.log('Not found', { hero_fighter, opponent_fighter });
          return;
        }

        const numSimulation = settings.heavy ? 1000 : 100;
        const heroTeams = getTeamsFromFighters(hero_fighter);
        const opponentTeams = getTeamsFromFighters(opponent_fighter);
        const expected = simulatePentaDrill(
          heroTeams,
          opponentTeams,
          numSimulation,
        );

        await Async.afterGameScriptsRun();

        const $box = createSimResultsBox(expected);
        $('.opponent_rewards').after($box);
      }
    }

    if (settings.debugLog && Page.startsWith('/penta-drill-battle.html')) {
      $(document).ajaxComplete((_event, jqXHR, ajaxOptions) => {
        const { url, data } = ajaxOptions;
        if (!url?.startsWith('/ajax.php')) return;
        if (typeof data !== 'string') return;
        if (data.includes('action=do_battles_penta_drill')) {
          const { hero_fighter_v4, opponent_fighter_v4 } = unsafeWindow;
          if (hero_fighter_v4 == null || opponent_fighter_v4 == null) return;
          const responseData =
            jqXHR.responseJSON as PentaDrillBattleResponseData;
          const debugLog = {
            hero_fighter_v4,
            opponent_fighter_v4,
            responseData,
          };
          console.log(JSON.stringify(debugLog));
          validatePentaDrill(debugLog);
        }
      });
    }

    function createSimResultsBox(expected: {
      points: number;
      rounds: number;
      pointTable: number[];
      minRounds: number;
      maxRounds: number;
    }) {
      const $box = $(render(<div className="pdsim-result-box"></div>));
      const $left = $(render(<div className="pdsim-result pdsim-left"></div>))
        .html(
          render(
            <>
              <div className="pdsim-label">E[Points]:</div>
              <span className="pdsim-points">{expected.points.toFixed(2)}</span>
            </>,
          ),
        )
        .attr(
          'tooltip',
          render(
            <table>
              {expected.pointTable
                .map((e, i): [number, number] => [i, e])
                .filter(([_, e]) => e > 0)
                .map(([i, e]) => (
                  <tr key={i} style={{ color: Color.getPDPointsColor(i) }}>
                    <td>{i}</td>
                    <td>:</td>
                    <td>{(100 * e).toFixed(0)}%</td>
                  </tr>
                ))}
            </table>,
          ),
        )
        .css('color', Color.getPDPointsColor(expected.points));

      const $right = $(render(<div className="pdsim-result pdsim-right"></div>))
        .html(
          render(
            <>
              <div className="pdsim-label">E[Rounds]:</div>
              <span className="pdsim-rounds">{expected.rounds.toFixed(1)}</span>
            </>,
          ),
        )
        .attr('tooltip', `${expected.minRounds} - ${expected.maxRounds}`)
        .css('color', Color.getRoundsColor(expected.maxRounds));

      $box.append($left);
      $box.append($right);

      return $box;
    }
  },
};
