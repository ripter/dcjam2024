
export function snakeToCamel(snakeCaseString) {
  return snakeCaseString.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}