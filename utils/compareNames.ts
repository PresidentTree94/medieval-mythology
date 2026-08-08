export function compareNames(aName: string, bName: string) {
  const partsA = aName.trim().toLowerCase().split(" ");
  const partsB = bName.trim().toLowerCase().split(" ");

  const lastA = partsA[partsA.length - 1];
  const lastB = partsB[partsB.length - 1];

  const lastCompare = lastA.localeCompare(lastB);
  if (lastCompare !== 0) return lastCompare;

  const firstA = partsA[0];
  const firstB = partsB[0];

  return firstA.localeCompare(firstB);
}