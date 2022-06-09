const LENGTH_LIMIT = 90;

export function shortString(value: string) {
  if (value.length < LENGTH_LIMIT) return value;
  return `${value.slice(0, LENGTH_LIMIT - 1)}…`;
}
