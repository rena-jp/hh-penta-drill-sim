export function injectToHead(css: string): HTMLStyleElement {
  const head = document.head;
  if (head == null) throw new Error('document.head not found');
  const style = document.createElement('style');
  style.classList.add('pdsim-style');
  style.innerHTML = css;
  head.append(style);
  return style;
}
