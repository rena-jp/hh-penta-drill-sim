import { render } from 'preact-render-to-string';
import type { MyModule } from '../../common/types';
import { Async, Page, Style } from '../../utils';
import css from './style.css';

export const AddResoureBarModule: MyModule<never> = {
  key: 'CompactRewardsModule',
  label: 'Add Resouce Bar on pre-battle page',
  default: true,
  async run(): Promise<void> {
    if (!Page.startsWith('/penta-drill-pre-battle')) return;
    Style.injectToHead(css);
    await Async.afterDomContentLoaded();
    $('.penta-drill-pre-battle-container').append(
      render(
        <div className="pdsim-resource-box">
          <div
            id="drill_energy"
            className="energy_counter"
            {...{ type: 'drill' }}
          ></div>
        </div>,
      ),
    );
  },
};
