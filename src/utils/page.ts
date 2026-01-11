export function startsWith(searchString: string): boolean {
  return unsafeWindow.location.pathname.startsWith(searchString);
}
