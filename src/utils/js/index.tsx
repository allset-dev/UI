export function isEqual(a: any, b: any) {
  if (typeof a === 'object') {
    JSON.stringify(a) === JSON.stringify(b);
  } else {
    return a === b;
  }
}
