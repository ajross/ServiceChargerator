export function formatBoroughFromProp(input:string):string {
  return input
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
