export function displayName(entry: any) {
  return entry?.displayProperties?.name ?? '';
}
export function displayDescription(entry: any) {
  return entry?.displayProperties?.description ?? '';
}
export function progressDescription(entry: any) {
  return entry?.progressDescription ?? '';
}
export function statName(entry: any) {
  return entry?.statName ?? '';
}
export function tierName(entry: any) {
  return entry?.tierName ?? '';
}

export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
