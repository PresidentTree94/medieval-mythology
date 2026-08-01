import { Character } from "@/types/CharacterType";

export function sortCharacters(characters: Character[]): Character[] {
  return characters.sort((a, b) => {
    const partsA = a.name.trim().toLowerCase().split(" ");
    const partsB = b.name.trim().toLowerCase().split(" ");

    const lastA = partsA[partsA.length - 1];
    const lastB = partsB[partsB.length - 1];

    const lastCompare = lastA.localeCompare(lastB);
    if (lastCompare !== 0) return lastCompare;

    const firstA = partsA[0];
    const firstB = partsB[0];

    return firstA.localeCompare(firstB);
  });
}