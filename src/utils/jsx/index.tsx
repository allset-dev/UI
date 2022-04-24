export function CN(...args: string[]) {
  return args.filter((isNotEmpty) => isNotEmpty).join(' ');
}
