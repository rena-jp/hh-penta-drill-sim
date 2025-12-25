import type { MyModule } from '../../common/types';
import { Page, Style } from '../../utils';
import css from './style.css';

export const CompactRewardsModule: MyModule<never> = {
  key: 'CompactRewardsModule',
  label: 'Compact battle rewards',
  default: true,
  run() {
    if (!Page.startsWith('/penta-drill-battle.html')) return;
    Style.injectToHead(css);
  },
};
