// ==UserScript==
// @name         Hentai Heroes Penta Drill Sim
// @namespace    https://github.com/rena-jp/hh-penta-drill-sim
// @version      0.0.3
// @description  Add Penta Drill simulator for Hentai Heroes
// @author       rena
// @match        https://*.hentaiheroes.com/*
// @match        https://nutaku.haremheroes.com/*
// @match        https://*.gayharem.com/*
// @match        https://*.comixharem.com/*
// @match        https://*.pornstarharem.com/*
// @match        https://*.transpornstarharem.com/*
// @match        https://*.gaypornstarharem.com/*
// @match        https://*.mangarpg.com/*
// @grant        none
// @run-at       document-body
// @updateURL    https://github.com/rena-jp/hh-penta-drill-sim/raw/main/dist/hh-penta-drill-sim.dev.meta.js
// @downloadURL  https://github.com/rena-jp/hh-penta-drill-sim/raw/main/dist/hh-penta-drill-sim.dev.user.js
// ==/UserScript==

"use strict";
(() => {
  // src/async.ts
  var DomContentLoaded = new Promise((resolve) => {
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => resolve(), {
        capture: true,
        once: true
      });
    } else {
      resolve();
    }
  });
  var JQueryLoaded = new Promise((resolve) => {
    if (window.$ != null) {
      resolve();
    } else {
      DomContentLoaded.then(() => {
        if (window.$ != null) {
          resolve();
        }
      });
    }
  });
  var GameScriptsRun = new Promise((resolve) => {
    DomContentLoaded.then(() => {
      $(() => {
        resolve();
      });
    });
  });
  var ThirdpartyScriptsRun = new Promise((resolve) => {
    GameScriptsRun.then(() => {
      $(() => {
        resolve();
      });
    });
  });
  async function beforeGameScriptsRun() {
    await Promise.all([JQueryLoaded, DomContentLoaded]);
  }
  function afterJQueryLoaded() {
    return JQueryLoaded;
  }
  function afterDomContentLoaded() {
    return DomContentLoaded;
  }
  function afterGameScriptsRun() {
    return GameScriptsRun;
  }
  function afterThirdpartyScriptsRun() {
    return ThirdpartyScriptsRun;
  }
  function run(f) {
    return new Promise((resolve) => {
      queueMicrotask(() => {
        Promise.resolve(f()).then(resolve);
      });
    });
  }
  async function importHHPlusPlus() {
    if (window.HHPlusPlus) return window.HHPlusPlus;
    await beforeGameScriptsRun();
    if (window.HHPlusPlus) return window.HHPlusPlus;
    await afterGameScriptsRun();
    if (window.HHPlusPlus) return window.HHPlusPlus;
    await afterThirdpartyScriptsRun();
    return window.HHPlusPlus;
  }
  function querySelector(target, selector) {
    return new Promise((resolve) => {
      const tryResolve = () => {
        const element = target.querySelector(selector);
        const found = element !== null;
        if (found) resolve(element);
        return found;
      };
      if (tryResolve()) return;
      const observer = new MutationObserver((mutations) => {
        if (mutations.every((mutation) => mutation.addedNodes.length === 0))
          return;
        if (tryResolve()) observer.disconnect();
      });
      observer.observe(target, { childList: true, subtree: true });
    });
  }
  function querySelectorAll(target, selector) {
    return new Promise((resolve) => {
      const tryResolve = () => {
        const elements = target.querySelectorAll(selector);
        const found = elements.length > 0;
        if (found) resolve(elements);
        return found;
      };
      if (tryResolve()) return;
      const observer = new MutationObserver((mutations) => {
        if (mutations.every((mutation) => mutation.addedNodes.length === 0))
          return;
        if (tryResolve()) observer.disconnect();
      });
      observer.observe(target, { childList: true, subtree: true });
    });
  }
  var async_default = {
    afterDomContentLoaded,
    afterGameScriptsRun,
    afterJQueryLoaded,
    afterThirdpartyScriptsRun,
    beforeGameScriptsRun,
    importHHPlusPlus,
    querySelector,
    querySelectorAll,
    run
  };

  // src/data.ts
  function getTeamFromFighter(fighters) {
    const list = fighters.map((e) => getGirlFromFighter(e));
    const ids = list.map((e) => e.id_girl);
    const map = Object.fromEntries(list.map((e) => [e.id_girl, e]));
    const team = {
      ids,
      list,
      map,
      front: [2, 3].map((e) => list[e]).filter((e) => e != null),
      middle: [0, 1, 4].map((e) => list[e]).filter((e) => e != null),
      back: [5, 6].map((e) => list[e]).filter((e) => e != null),
      reassurance_summary: [],
      pleasurelock_damage: 0
    };
    return team;
  }
  function getTeamFromGameTeam(team, isHero) {
    const list = team.girls.map((e) => getGirlFromTeamGirl(e, isHero));
    const ids = list.map((e) => e.id_girl);
    const map = Object.fromEntries(list.map((e) => [e.id_girl, e]));
    return {
      ids,
      list,
      map,
      front: [2, 3].map((e) => list[e]).filter((e) => e != null),
      middle: [0, 1, 4].map((e) => list[e]).filter((e) => e != null),
      back: [5, 6].map((e) => list[e]).filter((e) => e != null),
      reassurance_summary: [],
      pleasurelock_damage: 0
    };
  }
  function getGirlFromFighter(girl) {
    return {
      id_girl: girl.id_girl,
      damage: girl.damage,
      defense: girl.defense,
      initial_defense: girl.defense,
      initial_ego: girl.initial_ego,
      chance: girl.chance,
      remaining_ego: girl.initial_ego,
      remaining_mana: girl.remaining_mana,
      speed: girl.speed,
      is_hero_fighter: girl.is_hero_fighter,
      total_shields_amount: girl.total_shields_amount,
      is_defeated: false,
      // mana_generation: girl.girl.battle_caracs.mana_generation, // 20
      trigger_skill: girl.trigger_skill,
      id_role: girl.girl.girl.id_role,
      burn_summary: [],
      stun_summary: 0
    };
  }
  function getGirlFromTeamGirl(girl, isHero) {
    const caracs = girl.battle_caracs;
    return {
      id_girl: girl.id_girl,
      damage: caracs.damage,
      defense: caracs.defense,
      initial_defense: caracs.defense,
      initial_ego: caracs.ego,
      chance: caracs.chance,
      remaining_ego: caracs.ego,
      remaining_mana: caracs.mana_starting,
      speed: caracs.speed,
      is_hero_fighter: isHero,
      total_shields_amount: 0,
      is_defeated: false,
      // mana_generation: girl.girl.battle_caracs.mana_generation, // 20
      trigger_skill: getSkill(girl),
      id_role: girl.girl.id_role,
      burn_summary: [],
      stun_summary: 0
    };
  }
  function getSkill(girl) {
    return [
      15,
      // darkness, Spank!, 'punch'
      16,
      // light, Recovery, 'heal_up'
      17,
      // psychic, Mana Steal, mana_steal
      18,
      // water, Shields Up, 'shield_many'
      19,
      // fire, Burnout!, 'burn'
      20,
      // nature, Mana Boost, 'mana_boost'
      21,
      // stone, Reassurance, 'defenses_up'
      22
      // sun, Lovestruck, 'stun_many'
      // 23, // Spank!, "light_punch"
    ].reduce((p, c) => {
      return p ?? girl.skills[c]?.skill;
    }, void 0) ?? {
      id_skill: 23,
      level: 0,
      skill_type: "light_punch",
      flat_value: null,
      percentage_value: 50
    };
  }

  // src/simulator.ts
  function simulatePentaDrill(player, opponent, count) {
    const playerFighters = player.fighters;
    const opponentFighters = opponent.fighters;
    const matches = Math.min(playerFighters.length, opponentFighters.length);
    const points = Array(11).fill(0);
    let totalSum = 0;
    let totalRounds = 0;
    let minRounds = Number.MAX_SAFE_INTEGER;
    let maxRounds = 0;
    for (let i = 0; i < count; i++) {
      let sum = 0;
      let rounds = 0;
      let sumRounds = 0;
      for (let j = 0; j < matches; j++) {
        const playerTeam = getTeamFromFighter(playerFighters[j]);
        const opponentTeam = getTeamFromFighter(opponentFighters[j]);
        const result = simulateBattle(playerTeam, opponentTeam, rounds);
        sum += result.result;
        sumRounds += result.rounds - rounds;
        rounds = result.rounds;
        if (result.result === 1) rounds = 0;
      }
      points[sum]++;
      totalSum += sum;
      totalRounds += sumRounds;
      minRounds = Math.min(minRounds, sumRounds);
      maxRounds = Math.max(maxRounds, sumRounds);
    }
    return {
      points: totalSum / count,
      rounds: totalRounds / count,
      pointTable: points.map((e) => e / count),
      minRounds,
      maxRounds
    };
  }
  function simulatePentaDrill2(playerTeams, opponentTeams, count) {
    const matches = Math.min(playerTeams.length, opponentTeams.length);
    const points = Array(11).fill(0);
    let totalSum = 0;
    let totalRounds = 0;
    let minRounds = Number.MAX_SAFE_INTEGER;
    let maxRounds = 0;
    for (let i = 0; i < count; i++) {
      let sum = 0;
      let rounds = 0;
      let sumRounds = 0;
      for (let j = 0; j < matches; j++) {
        const playerTeam = getTeamFromGameTeam(playerTeams[j], true);
        const opponentTeam = getTeamFromGameTeam(opponentTeams[j], false);
        const result = simulateBattle(playerTeam, opponentTeam, rounds);
        sum += result.result;
        sumRounds += result.rounds - rounds;
        rounds = result.rounds;
        if (result.result === 1) rounds = 0;
      }
      points[sum]++;
      totalSum += sum;
      totalRounds += sumRounds;
      minRounds = Math.min(minRounds, sumRounds);
      maxRounds = Math.max(maxRounds, sumRounds);
    }
    return {
      points: totalSum / count,
      rounds: totalRounds / count,
      pointTable: points.map((e) => e / count),
      minRounds,
      maxRounds
    };
  }
  function simulateBattle(playerTeam, opponentTeam, startRounds) {
    const order = [
      ...playerTeam.list.map((girl, i) => ({
        attacker: girl,
        attackerTeam: playerTeam,
        defenderTeam: opponentTeam,
        teamOrder: i + 7
      })),
      ...opponentTeam.list.map((girl, i) => ({
        attacker: girl,
        attackerTeam: opponentTeam,
        defenderTeam: playerTeam,
        teamOrder: i
      }))
    ];
    order.sort((x, y) => {
      const xSpeed = x.attacker.speed;
      const ySpeed = y.attacker.speed;
      if (xSpeed < ySpeed) return 1;
      if (xSpeed > ySpeed) return -1;
      return x.teamOrder < y.teamOrder ? -1 : 1;
    });
    let rounds = startRounds - 1;
    for (let i = 0, n = order.length * 100; i < n; i++) {
      if (playerTeam.list.every((e) => e.is_defeated)) {
        return { result: 0, rounds };
      }
      if (opponentTeam.list.every((e) => e.is_defeated)) {
        return { result: 2, rounds };
      }
      if (i % order.length === 0) {
        rounds++;
        if (rounds >= 100) {
          return { result: 1, rounds };
        }
        [playerTeam, opponentTeam].forEach((team) => {
          team.reassurance_summary = team.reassurance_summary.reduce(
            (newList, skill) => {
              skill.rounds_left--;
              if (skill.rounds_left <= 0) {
                skill.buffs.forEach(([girl, value]) => {
                  girl.defense -= value;
                });
              } else {
                newList.push(skill);
              }
              return newList;
            },
            []
          );
        });
      }
      const { attacker, attackerTeam, defenderTeam } = order[i % order.length];
      if (attacker.is_defeated) continue;
      let isStunned = false;
      if (attacker.stun_summary > 0) {
        attacker.stun_summary--;
        isStunned = true;
      }
      if (!isStunned) {
        if (attacker.id_role === 4 && attackerTeam.list.some(
          (e) => e !== attacker && !e.is_defeated && e.remaining_ego < e.initial_ego
        )) {
          const flufferTargets = attackerTeam.list.filter(
            (e) => e !== attacker && !e.is_defeated && e.remaining_ego < e.initial_ego
          );
          const target = flufferTargets.length === 1 ? flufferTargets[0] : flufferTargets.reduce(
            (p, c) => p.remaining_ego <= c.remaining_ego ? p : c
          );
          let heal = attacker.damage;
          if (isCritical(attacker, target)) {
            heal += Math.max(0, attacker.damage - target.defense);
          }
          if (!attacker.is_hero_fighter) heal = Math.ceil(heal * 0.05);
          heal = Math.min(heal, target.initial_ego - target.remaining_ego);
          target.remaining_ego += heal;
        } else {
          let defender;
          if (attacker.id_role === 5) {
            defender = lowestEgoValue(defenderTeam);
          } else {
            let targets = defenderTeam.front.filter((e) => !e.is_defeated);
            if (targets.length == 0)
              targets = defenderTeam.middle.filter((e) => !e.is_defeated);
            if (targets.length == 0)
              targets = defenderTeam.back.filter((e) => !e.is_defeated);
            defender = selectTargetFrom(targets);
          }
          let damage = Math.max(0, attacker.damage - defender.defense);
          if (isCritical(attacker, defender)) {
            if (attacker.id_role === 6) {
              damage = Math.ceil(damage * 2.4);
            } else {
              damage *= 2;
            }
          }
          attack(defender, damage);
        }
        if (attacker.remaining_mana < 100) {
          const addingMana = attacker.id_role === 2 ? 35 : 20;
          attacker.remaining_mana = Math.min(
            100,
            attacker.remaining_mana + addingMana
          );
        }
        if (attacker.is_hero_fighter) {
          if (opponentTeam.list.every((e) => e.is_defeated)) {
            return { result: 2, rounds };
          }
        } else {
          if (playerTeam.list.every((e) => e.is_defeated)) {
            return { result: 0, rounds };
          }
        }
        if (attacker.remaining_mana >= 100) {
          const roleId = attacker.id_role;
          if (roleId === 10) {
            const targets = attackerTeam.list.filter((e) => e.is_defeated);
            if (targets.length) {
              const target = selectTargetFrom(targets);
              let heal = attacker.remaining_ego;
              if (!attacker.is_hero_fighter) {
                heal = Math.ceil(heal * 0.05);
              }
              target.remaining_ego += heal;
              if (target.remaining_ego > 0) target.is_defeated = false;
              attacker.remaining_mana -= 100;
            }
          } else {
            const skill = attacker.trigger_skill;
            const percentage = skill.percentage_value / 100;
            const flat = skill.flat_value;
            switch (skill.id_skill) {
              // Spank! (Dominatrix) + No skill
              case 15:
              case 23:
              default: {
                const targets = defenderTeam.list.filter((e) => !e.is_defeated);
                const defender = selectTargetFrom(targets);
                let damage = Math.ceil(attacker.damage * percentage) - defender.defense;
                damage = Math.max(0, damage);
                attack(defender, damage);
                attacker.remaining_mana -= 100;
                break;
              }
              // Recovery (Submissive)
              case 16: {
                attackerTeam.list.filter((e) => !e.is_defeated).forEach((e) => {
                  let heal = Math.ceil(e.initial_ego * percentage);
                  if (!attacker.is_hero_fighter) {
                    heal = Math.ceil(heal * 0.05);
                  }
                  e.remaining_ego = Math.min(
                    e.initial_ego,
                    e.remaining_ego + heal
                  );
                });
                attacker.remaining_mana -= 100;
                break;
              }
              // Mana Steal (Voyeur)
              case 17: {
                const targets = defenderTeam.list.filter(
                  (e) => e.remaining_mana > 0
                );
                const stolenMana = Math.floor(
                  percentage * targets.reduce((p, c) => {
                    const mana = Math.floor(c.remaining_mana * percentage);
                    c.remaining_mana -= mana;
                    return p + c.remaining_mana + mana;
                  }, 0)
                );
                attacker.remaining_mana = Math.min(
                  100,
                  attacker.remaining_mana - 100 + stolenMana
                );
                break;
              }
              // Shields Up (Sensual)
              case 18: {
                let targets = attackerTeam.list.filter(
                  (e) => e != attacker && !e.is_defeated && e.total_shields_amount >= e.initial_ego
                );
                targets = selectTargetsFrom(targets, 3);
                targets.forEach((e) => {
                  const shield = Math.ceil(e.initial_ego * percentage);
                  e.total_shields_amount = Math.min(
                    e.initial_ego,
                    e.total_shields_amount + shield
                  );
                });
                attacker.remaining_mana -= 100;
                break;
              }
              // Burnout! (Eccentric)
              case 19: {
                let targets = defenderTeam.list.filter((e) => !e.is_defeated);
                targets = selectTargetsFrom(targets, 2);
                targets.forEach((e) => {
                  const damage = Math.ceil(e.initial_ego * percentage);
                  e.burn_summary.push({ damage, rounds_left: flat });
                });
                attacker.remaining_mana -= 100;
                break;
              }
              // Mana Boost (Exhibitionist)
              case 20: {
                let targets = attackerTeam.list.filter(
                  (e) => e != attacker && !e.is_defeated
                );
                targets = selectTargetsFrom(targets, 2);
                targets.forEach((e) => {
                  e.remaining_mana += flat;
                });
                attacker.remaining_mana -= 100;
                break;
              }
              // Reassurance (Physical)
              case 21: {
                const targets = attackerTeam.list.filter((e) => !e.is_defeated);
                const buffs = targets.map((e) => {
                  const buff = Math.ceil(e.initial_defense * percentage);
                  e.defense += buff;
                  return [e, buff];
                });
                attackerTeam.reassurance_summary.push({
                  buffs,
                  rounds_left: flat
                });
                attacker.remaining_mana -= 100;
                break;
              }
              // Lovestruck (Playful)
              case 22: {
                const p = 0.1 + skill.level * 0.035;
                if (Math.random() < p) {
                  let targets = defenderTeam.list.filter((e) => !e.is_defeated);
                  targets = selectTargetsFrom(targets, 2);
                  targets.forEach((e) => {
                    e.stun_summary += 2;
                  });
                  attacker.remaining_mana -= 100;
                }
                break;
              }
            }
          }
        }
      }
      if (attacker.burn_summary.length > 0) {
        const burn = attacker.burn_summary[0];
        burn.rounds_left--;
        attack(attacker, burn.damage);
        if (burn.rounds_left <= 0) {
          attacker.burn_summary.shift();
        }
      }
    }
    return { result: 1, rounds: rounds + 1 };
  }
  function isCritical(attacker, defender) {
    return Math.random() <= 0.3 * attacker.chance / (attacker.chance + defender.chance);
  }
  function selectTargetFrom(targets) {
    return targets[Math.floor(targets.length * Math.random())];
  }
  function selectTargetsFrom(targets, maxCount) {
    if (targets.length <= maxCount) return targets;
    const ret = [];
    [...Array(maxCount)].forEach(() => {
      const i = Math.floor(Math.random() * targets.length);
      ret.push(targets[i]);
      targets[i] = targets[targets.length - 1];
      targets.length--;
    });
    return ret;
  }
  function lowestEgoValue(team) {
    return team.list.filter((e) => !e.is_defeated).reduce((p, c) => p.remaining_ego <= c.remaining_ego ? p : c);
  }
  function attack(defender, damage) {
    if (defender.total_shields_amount >= damage) {
      defender.total_shields_amount -= damage;
    } else {
      defender.remaining_ego -= damage - defender.total_shields_amount;
      defender.total_shields_amount = 0;
      if (defender.remaining_ego <= 0) defender.is_defeated = true;
    }
  }

  // src/style/compact-grid.css
  var compact_grid_default = "body.page-edit-penta-drill-team .harem-panel .harem-panel-girls {\n  padding: 0;\n  grid-row-gap: 0;\n  grid-template-columns: repeat(5, 58px);\n}\nbody.page-edit-penta-drill-team .harem-panel-girls .harem-girl-container {\n  width: 58px;\n  height: 80px;\n}\n";

  // src/style/compact-rewards.css
  var compact_rewards_default = "body.page-penta-drill-battle .popup_wrapper #rewards_popup .flex-container .rewards .container .scrolling_area,\nbody.page-penta-drill-battle .popup_wrapper #rewards_popup .flex-container .rewards .container .rewards_scrollable,\nbody.page-penta-drill-battle .popup_wrapper #rewards_popup .flex-container .rewards .rewards_background {\n  max-height: unset;\n}\nbody.page-penta-drill-battle #rewards_big_header:not(.losing) {\n  zoom: 0.4;\n}\nbody.page-penta-drill-battle .popup_wrapper #rewards_popup .flex-container .rewards .container .rewards_scrollable {\n  zoom: 0.65;\n}\n";

  // src/style/sim-results.css
  var sim_results_default = ".pd-sim-result-box {\n  position: relative;\n  width: 100%;\n  height: 0;\n}\n.pd-sim-result-box .pd-sim-result {\n  position: absolute;\n  width: max-content;\n  height: 0;\n  line-height: 1.25rem;\n  text-align: center;\n  text-shadow:\n    -1px -1px 0 #000,\n    -1px 1px 0 #000,\n    1px -1px 0 #000,\n    1px 1px 0 #000;\n  z-index: 1;\n}\n.pd-sim-result-box .pd-sim-result .pd-sim-label {\n  font-size: 0.75rem;\n}\n.pd-sim-result-box .pd-sim-result.pd-sim-pending {\n  color: #999;\n}\n.penta-drill-battle .pd-sim-result-box .pd-sim-result {\n  bottom: 3rem;\n}\n.penta-drill-battle .pd-sim-result-box .pd-sim-result.pd-sim-right {\n  right: 0;\n}\n.penta-drill-battle .pd-sim-result-box .pd-sim-result.pd-sim-left {\n  left: 0;\n}\n.opponent-info-container .pd-sim-result-box .pd-sim-result {\n  bottom: 3.5rem;\n}\n.opponent-info-container .pd-sim-result-box .pd-sim-result.pd-sim-right {\n  right: 10%;\n}\n.opponent-info-container .pd-sim-result-box .pd-sim-result.pd-sim-left {\n  left: 10%;\n}\n";

  // src/style/tooltip-on-locked-girl.css
  var tooltip_on_locked_girl_default = "body.page-edit-penta-drill-team #edit-team-page.penta-drill .harem-panel .panel-body .harem-panel-girls .harem-girl-container:not(.selected)[team_slot] .grey-overlay {\n  pointer-events: none;\n}\n";

  // src/style/shortcut-bar.css
  var shortcut_bar_default = "#shortcut-bar-box {\n  position: absolute;\n  right: 408px;\n  width: fit-content;\n  display: flex;\n  flex-direction: row;\n  gap: 0.35rem;\n  padding: 0.7rem 1px 0.7rem 0.7rem;\n  border-radius: 0.7rem 0 0 0.7rem;\n  background-color: #4f222e;\n  z-index: 1;\n}\n#shortcut-bar-box .shortcut-bar {\n  display: flex;\n  flex-direction: column;\n}\n#shortcut-bar-box .shortcut-bar .check-btn.element-state {\n  width: 38px;\n  height: 38px;\n  padding: 0;\n}\n#shortcut-bar-box .shortcut-bar .check-btn.element-state .role-icn {\n  width: 36px;\n  height: 36px;\n  background-size: 27px;\n}\n@media (min-width: 1026px) {\n  #shortcut-bar-box {\n    top: 113px;\n  }\n}\n@media (max-width: 1025px) {\n  #shortcut-bar-box {\n    top: 134px;\n  }\n}\n";

  // src/style/clickable-skip-buttons.css
  var clickable_skip_buttons_default = "#named-attack-background,\n#named-attack-container,\n.pvp-girls {\n  pointer-events: none;\n}\n";

  // src/style/add-resource-bar.css
  var add_resource_bar_default = ".pd-sim-resource-box {\n  width: 100%;\n  height: 0;\n  position: relative;\n}\n.pd-sim-resource-box #drill_energy {\n  position: absolute;\n  bottom: 6rem;\n  left: 38%;\n  right: 38%;\n}\n.pd-sim-resource-box #drill_energy.energy_counter span[rel=count_txt] {\n  margin-top: 0;\n}\n";

  // src/types.ts
  var ElementTypes = [
    "darkness",
    "light",
    "psychic",
    "water",
    "fire",
    "nature",
    "stone",
    "sun"
  ];
  var RoleIds = [1, 2, 3, 4, 5, 6, 9, 10];
  var SkillNameFromSkillType = {
    punch: "Spank!",
    heal_up: "Recovery",
    mana_steal: "Mana Steal",
    shield_many: "Shields Up",
    burn: "Burnout!",
    mana_boost: "Mana Boost",
    defenses_up: "Reassurance",
    stun_many: "Lovestruck",
    light_punch: "Default"
  };
  var SkillTypeFromElement = {
    darkness: "punch",
    light: "heal_up",
    psychic: "mana_steal",
    water: "shield_many",
    fire: "burn",
    nature: "mana_boost",
    stone: "defenses_up",
    sun: "stun_many"
  };

  // src/index.ts
  (async function() {
    "use strict";
    await async_default.afterJQueryLoaded();
    const PagePath = window.location.pathname;
    const moduleList = [
      PentaDrillSimModule,
      TeamEditingTweaksModule,
      AddResoureBarModule,
      FasterSkipButtonModule,
      CompactRewardsModule
    ];
    const HHPlusPlus = await async_default.importHHPlusPlus();
    if (HHPlusPlus) {
      if (registerModules()) return;
    }
    moduleList.forEach((f) => {
      const module = f();
      if (module.default) {
        const settings = module.settings?.reduce((p, c) => {
          p[c.key] = c.default;
          return p;
        }, {});
        module.run(settings);
      }
    });
    return;
    function registerModules() {
      const { hhPlusPlusConfig } = window;
      if (!hhPlusPlusConfig) return false;
      const GROUP_KEY = "pdsim";
      hhPlusPlusConfig.registerGroup({ key: GROUP_KEY, name: `PD Sim` });
      moduleList.forEach((f) => {
        const module = f();
        if (!module || !module.run) return;
        hhPlusPlusConfig.registerModule({
          group: GROUP_KEY,
          configSchema: {
            baseKey: f.name,
            label: module.label,
            default: module.default ?? true,
            subSettings: module.settings
          },
          hasRun: false,
          run(subSettings) {
            if (!this.hasRun) {
              const maybePromise = module.run(subSettings);
              this.hasRun = true;
              Promise.resolve(maybePromise).then((result) => {
                this.hasRun = result !== false;
              });
            }
          },
          tearDown() {
            if (this.hasRun && module.undo) {
              this.hasRun = module.undo() === false;
            }
          }
          // updateSubSetting(subKey, value) { }, // No one uses it
        });
      });
      hhPlusPlusConfig.loadConfig();
      hhPlusPlusConfig.runModules();
      return true;
    }
    function PentaDrillSimModule() {
      return {
        label: "Penta Drill Sim",
        default: true,
        settings: [
          { key: "arena", default: true, label: "Run on table page" },
          { key: "preBattle", default: true, label: "Run on pre-battle page" },
          { key: "heavy", default: false, label: "Heavy simulation (slow)" }
        ],
        async run(settings) {
          if (settings.arena && PagePath.startsWith("/penta-drill-arena.html")) {
            await async_default.beforeGameScriptsRun();
            $(document.head).append(`<style>${sim_results_default}</style>`);
            const { player_datas, opponents_list } = window;
            if (player_datas == null || opponents_list == null) {
              console.log("Not found", { player_datas, opponents_list });
              return;
            }
            const numSimulation = settings.heavy ? 300 : 100;
            opponents_list.forEach(async (opponent) => {
              const expected = simulatePentaDrill2(
                player_datas.team,
                opponent.player.team,
                numSimulation
              );
              await async_default.afterGameScriptsRun();
              const $box = createSimResultsBox(expected);
              let $button = $(
                `a[href$="id_opponent=${opponent.player.id_fighter}"]`
              );
              if ($button.length === 0) {
                $button = $(
                  `a[href*="id_opponent=${opponent.player.id_fighter}&"]`
                );
              }
              $button.parent().after($box);
              await async_default.afterThirdpartyScriptsRun();
              if ($box.parent().find("#perform_opponent").length > 0) {
                $box.find(".pd-sim-right").css("right", 0);
                $box.find(".pd-sim-left").css("left", 0);
              }
            });
          }
          if (PagePath.startsWith("/penta-drill-pre-battle")) {
            await async_default.beforeGameScriptsRun();
            $(document.head).append(`<style>${sim_results_default}</style>`);
            if (settings.preBattle) {
              const { hero_fighter, opponent_fighter } = window;
              if (hero_fighter == null || opponent_fighter == null) {
                console.log("Not found", { hero_fighter, opponent_fighter });
                return;
              }
              const numSimulation = settings.heavy ? 1e3 : 100;
              const expected = simulatePentaDrill(
                hero_fighter,
                opponent_fighter,
                numSimulation
              );
              await async_default.afterGameScriptsRun();
              const $box = createSimResultsBox(expected);
              $(".opponent_rewards").after($box);
            }
          }
          function createSimResultsBox(expected) {
            const $box = $('<div class="pd-sim-result-box"></div>');
            const $left = $('<div class="pd-sim-result pd-sim-left"></div>').html(
              `<div class="pd-sim-label">E[Points]:</div><span class="pd-sim-points">${expected.points.toFixed(2)}</span>`
            ).attr(
              "tooltip",
              expected.pointTable.map((e, i) => [i, e]).filter(([_, e]) => e > 0).map(([i, e]) => `${i} => ${(100 * e).toFixed(0)}%`).join("<br />")
            ).css("color", getPointsColor(expected.points));
            const $right = $('<div class="pd-sim-result pd-sim-right"></div>').html(
              `<div class="pd-sim-label">E[Rounds]:</div><span class="pd-sim-rounds">${expected.rounds.toFixed(1)}</span>`
            ).attr("tooltip", `${expected.minRounds} - ${expected.maxRounds}`).css("color", getRoundsColor(expected.maxRounds));
            $box.append($left);
            $box.append($right);
            return $box;
          }
          function clamp(value, min, max) {
            return value <= min ? min : value >= max ? max : value;
          }
          function getGammaCorrectedValue(value) {
            return Math.round(255 * Math.sqrt(clamp(value, 0, 1)));
          }
          function getRatingColor(rate) {
            const red = getGammaCorrectedValue(2 - 2 * rate);
            const green = getGammaCorrectedValue(2 * rate);
            return `rgb(${red}, ${green}, 0)`;
          }
          function getPointsColor(points) {
            const rate = clamp(points / 10, 0, 1) ** 3;
            return getRatingColor(rate);
          }
          function getRoundsColor(rounds) {
            const rate = clamp((100 - rounds) / 20, 0, 1);
            return getRatingColor(rate);
          }
        }
      };
    }
    function AddResoureBarModule() {
      return {
        label: "Add Resouce Bar on pre-battle page",
        default: true,
        async run() {
          if (!PagePath.startsWith("/penta-drill-pre-battle")) return;
          $(document.head).append(`<style>${add_resource_bar_default}</style>`);
          await async_default.beforeGameScriptsRun();
          $(".penta-drill-pre-battle-container").append(
            `<div class="pd-sim-resource-box"><div class="energy_counter" type="drill" id="drill_energy"></div></div>`
          );
        }
      };
    }
    function FasterSkipButtonModule() {
      return {
        label: "Make the skip button appear faster",
        default: true,
        settings: [
          {
            key: "clickableSkipButton",
            default: true,
            label: "Skip button remains clickable even during skill triggering"
          }
        ],
        async run(settings) {
          if (!PagePath.startsWith("/penta-drill-battle.html")) return;
          if (settings.clickableSkipButton) {
            $(document.head).append(`<style>${clickable_skip_buttons_default}</style>`);
          }
          await async_default.beforeGameScriptsRun();
          $(document).ajaxComplete((event, jqXHR, ajaxOptions) => {
            if (!ajaxOptions.url?.startsWith("/ajax.php")) return;
            if (ajaxOptions.data?.includes("action=do_battles_penta_drill")) {
              $(".skip-buttons-container").attr("style", "");
            }
          });
        }
      };
    }
    function CompactRewardsModule() {
      return {
        label: "Compact battle rewards",
        default: true,
        async run() {
          if (!PagePath.startsWith("/penta-drill-battle.html")) return;
          $(document.head).append(`<style>${compact_rewards_default}</style>`);
        }
      };
    }
    function TeamEditingTweaksModule() {
      return {
        label: "Team editing tweaks",
        default: true,
        settings: [
          { key: "compactGrid", default: true, label: "Compact grid" },
          {
            key: "tooltipOnLocked",
            default: true,
            label: "Show tooltip on locked girl"
          },
          {
            key: "shortcutBar",
            default: true,
            label: "Add shortcut bar"
          }
        ],
        async run(settings) {
          if (!PagePath.startsWith("/edit-penta-drill-team") && !PagePath.startsWith("/edit-labyrinth-team.html"))
            return;
          if (settings.compactGrid) {
            $(document.head).append(`<style>${compact_grid_default}</style>`);
          }
          if (settings.tooltipOnLocked) {
            $(document.head).append(`<style>${tooltip_on_locked_girl_default}</style>`);
          }
          if (settings.shortcutBar) {
            $(document.head).append(`<style>${shortcut_bar_default}</style>`);
          }
          await async_default.beforeGameScriptsRun();
          if (settings.shortcutBar) {
            const haremGirlsMap = {};
            const availableGirls = window.availableGirls;
            availableGirls.forEach((e) => {
              haremGirlsMap[e.id_girl] = e;
            });
            const html = [
              `<div id="shortcut-bar-box" class="checkbox-group">`,
              '<div class="shortcut-bar skill">',
              '<button class="check-btn element-state" value="all" tooltip="All"></button>',
              ElementTypes.map((e) => {
                const skillType = SkillTypeFromElement[e];
                const skillName = SkillNameFromSkillType[skillType];
                return `<button class="check-btn element-state" value="${e}" tooltip="${skillName}"><span class="role-icn ${skillType}_icn"></span></button>`;
              }).join(""),
              "</div>",
              '<div class="shortcut-bar role">',
              '<button class="check-btn element-state" value="all" tooltip="All Roles"></button>',
              RoleIds.map(
                (roleId) => `<button class="check-btn element-state" value="${roleId}" role-tooltip="${roleId}"><span class="role-icn girl_role_${roleId}_icn"></span></button>`
              ).join(""),
              "</div>",
              "</div>"
            ].join("");
            const panel = $(html);
            panel.insertAfter(".change-team-panel.harem-panel");
            panel.find(".role button.check-btn").each((_, e) => {
              const value = e.value;
              $(e).on("click", () => {
                let $roleFilter = $("select#filter_role");
                if ($roleFilter.length === 0)
                  $roleFilter = $('select[name="role"]');
                $roleFilter.prop("value", value).selectric("refresh").change();
              });
            });
            panel.find(".skill button.check-btn").each((_, e) => {
              const value = e.value;
              $(e).on("click", () => {
                let $elementFilter = $("select#filter_element");
                if ($elementFilter.length === 0)
                  $elementFilter = $('select[name="element"]');
                $elementFilter.prop("value", value).selectric("refresh").change();
                const $skillTierFilter = $("select#filter_skill_tier");
                if (value === "all") {
                  $skillTierFilter.prop("value", "all").selectric("refresh").change();
                } else {
                  $skillTierFilter.prop("value", 5).selectric("refresh").change();
                }
              });
            });
          }
        }
      };
    }
  })();
})();
