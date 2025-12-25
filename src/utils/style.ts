export function injectToHead(css: string): JQuery<HTMLStyleElement> {
  return $('<style />')
    .addClass('pdsim-style')
    .html(css)
    .appendTo(document.head) as JQuery<HTMLStyleElement>;
}
