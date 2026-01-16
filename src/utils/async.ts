import {} from '../common/global';

const bodyPromise: Promise<HTMLElement> = new Promise((resolve) => {
  const document = unsafeWindow.document;
  if (document.body != null) {
    resolve(document.body);
  } else {
    const htmlObserver = new MutationObserver(() => {
      if (document.body != null) {
        htmlObserver.disconnect();
        resolve(document.body);
      }
    });
    const html = document.documentElement;
    htmlObserver.observe(html, { childList: true });
  }
});

const pagePromise: Promise<string> = bodyPromise.then((body) => {
  const page = body.getAttribute('page');
  if (page != null) {
    return page;
  } else {
    return new Promise((resolve) => {
      const bodyObserver = new MutationObserver(() => {
        const page = body.getAttribute('page');
        if (page != null) {
          bodyObserver.disconnect();
          resolve(page);
        }
      });
      bodyObserver.observe(body, {
        attributes: true,
        attributeFilter: ['page'],
      });
    });
  }
});

const domContentLoadedCapturePromise = new Promise<void>((resolve) => {
  if (document.readyState === 'loading') {
    unsafeWindow.addEventListener('DOMContentLoaded', () => resolve(), {
      capture: true,
      once: true,
    });
  } else {
    resolve();
  }
});

const domContentLoadedBubblePromise = new Promise<void>((resolve) => {
  if (document.readyState === 'loading') {
    unsafeWindow.addEventListener('DOMContentLoaded', () => resolve(), {
      capture: false,
      once: true,
    });
  } else {
    resolve();
  }
});

const gameScriptsRunPromise = domContentLoadedCapturePromise.then(() => {
  return new Promise<void>((resolve) => {
    $(() => resolve());
  });
});

const thirdpartyScriptsRunPromise = new Promise<void>((resolve) => {
  void gameScriptsRunPromise.then(() => {
    $(() => resolve());
  });
});

export async function afterHeadLoaded(): Promise<void> {
  await pagePromise;
}

export function afterBodyLoaded(): Promise<void> {
  return domContentLoadedCapturePromise;
}

export function afterDomContentLoaded(): Promise<void> {
  return domContentLoadedBubblePromise;
}

export function afterGameScriptsRun(): Promise<void> {
  return gameScriptsRunPromise;
}

export function afterThirdpartyScriptsRun(): Promise<void> {
  return thirdpartyScriptsRunPromise;
}

export function run<T>(f: () => Promise<T> | T): Promise<T> {
  return new Promise((resolve) => {
    queueMicrotask(() => {
      void Promise.resolve(f()).then(resolve);
    });
  });
}

export async function importHHPlusPlusConfig(): Promise<
  HHPlusPlusConfig | undefined
> {
  if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig;
  await afterHeadLoaded();
  if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig;
  await afterBodyLoaded();
  if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig; // ViolentMonkey
  await afterDomContentLoaded();
  if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig; // TamperMonkey
  await afterGameScriptsRun();
  if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig;
  await afterThirdpartyScriptsRun();
  return unsafeWindow.hhPlusPlusConfig;
}

export function querySelector(target: HTMLElement, selector: string) {
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
    // target can be document because MutationObserver can observe document
    observer.observe(target, { childList: true, subtree: true });
  });
}

export function querySelectorAll(target: HTMLElement, selector: string) {
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
    // target can be document because MutationObserver can observe document
    observer.observe(target, { childList: true, subtree: true });
  });
}
