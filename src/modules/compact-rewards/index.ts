import type { MyModule } from '../../common/types';
import { Page, Style } from '../../utils';
import css from './style.css';

export const CompactRewardsModule: MyModule<never> = {
  key: 'CompactRewardsModule',
  label: 'Compact battle rewards',
  default: false,
  run() {
    if (
      Page.startsWith('/penta-drill-battle') ||
      Page.startsWith('/penta-drill-arena') ||
      Page.startsWith('/penta-drill-pre-battle')
    ) {
      Style.injectToHead(css);
    }
  },
};
