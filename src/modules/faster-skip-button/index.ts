import type { MyModule } from '../../common/types';
import { Async, Page, Style } from '../../utils';
import ClickableSkipButtonsCss from './clickable-skip-buttons.css';

export const FasterSkipButtonModule: MyModule<'clickableSkipButton'> = {
  key: 'FasterSkipButtonModule',
  label: 'Make the skip button appear faster',
  default: false,
  settings: [
    {
      key: 'clickableSkipButton',
      default: true,
      label: 'Skip button remains clickable even during skill triggering',
    },
  ],
  async run(settings) {
    if (!Page.startsWith('/penta-drill-battle.html')) return;
    if (settings.clickableSkipButton) {
      Style.injectToHead(ClickableSkipButtonsCss);
    }
    await Async.afterBodyLoaded();

    $(document).ajaxComplete((_event, _jqXHR, ajaxOptions) => {
      const { url, data } = ajaxOptions;
      if (!url?.startsWith('/ajax.php')) return;
      if (
        typeof data === 'string' &&
        data.includes('action=do_battles_penta_drill')
      ) {
        $('.skip-buttons-container').attr('style', '');
      }
    });
  },
};
