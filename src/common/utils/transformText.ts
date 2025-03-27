export function trimString({ value }: any): string {
  return typeof value === 'string' ? value.trim() : value;
}

export function toLowerCase({ value }: any): string {
  return typeof value === 'string' ? value.toLowerCase() : value;
}
