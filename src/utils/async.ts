import {} from '../common/global';

const DomContentLoaded = new Promise<void>((resolve) => {
  if (document.readyState === 'loading') {
    unsafeWindow.addEventListener('DOMContentLoaded', () => resolve(), {
      capture: true,
      once: true,
    });
  } else {
    resolve();
  }
});

const JQueryLoaded = new Promise<void>((resolve) => {
  if (unsafeWindow.$ != null) {
    resolve();
  } else {
    void DomContentLoaded.then(() => {
      if (unsafeWindow.$ != null) {
        resolve();
      }
    });
  }
});

const GameScriptsRun = new Promise<void>((resolve) => {
  void DomContentLoaded.then(() => {
    $(() => {
      resolve();
    });
  });
});

const ThirdpartyScriptsRun = new Promise<void>((resolve) => {
  void GameScriptsRun.then(() => {
    $(() => {
      resolve();
    });
  });
});

/*
export async function beforeGameScriptsRun(): Promise<void> {
  await Promise.all([JQueryLoaded, DomContentLoaded]);
}
*/

export function afterJQueryLoaded(): Promise<void> {
  return JQueryLoaded;
}

export function afterDomContentLoaded(): Promise<void> {
  return DomContentLoaded;
}

export function afterGameScriptsRun(): Promise<void> {
  return GameScriptsRun;
}

export function afterThirdpartyScriptsRun(): Promise<void> {
  return ThirdpartyScriptsRun;
}

export function run<T>(f: () => T): Promise<T> {
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
  await afterDomContentLoaded();
  if (unsafeWindow.hhPlusPlusConfig) return unsafeWindow.hhPlusPlusConfig;
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
