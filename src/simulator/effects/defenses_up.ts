import type { SimTeam } from '../../common/types';

function simulate(teams: SimTeam[]) {
  teams.forEach((team) => {
    team.reassurance_summary.forEach((e) => {
      e.rounds_left--;
      if (e.rounds_left <= 0) {
        e.buffs.forEach(([girl, value]) => {
          girl.defense -= value;
        });
      }
    });
    team.reassurance_summary = team.reassurance_summary.filter(
      (e) => e.rounds_left <= 0,
    );
  });
}

function validate() {}

export default { simulate, validate };
