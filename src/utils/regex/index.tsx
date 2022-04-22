/**
 * Adds escape character to regex special characters.
 * EX: Converts '[' to '\['.
 */
export function escapeRegSpecialChars(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
