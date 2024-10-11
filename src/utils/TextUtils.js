export function formatBoroughFromProp(input) {
  return input
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
