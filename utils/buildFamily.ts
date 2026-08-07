import { Character } from "@/types/CharacterType";
import { Social } from "@/types/SocialType";

export function buildFamily(
  character: Character, characters: Character[], relationships: Social[]
): { label: string; value: Character }[] {

  const family: { label: string; value: Character }[] = [];

  characters.forEach(c => {
    // Parents
    if (character.father === c.name || character.mother === c.name) {
      family.push({ label: c.gender === "Male" ? "Father" : "Mother", value: c });
      const union = relationships.find(r => (r.aCharacter.id === c.id || r.bCharacter.id === c.id) && r.relationship === "Spouse");
      if (union) {
        const partner = union.aCharacter.id === c.id ? union.bCharacter : union.aCharacter;
        if (partner.gender === "Male" && character.father !== partner.name) family.push({ label: "Step-father", value: partner });
        if (partner.gender === "Female" && character.mother !== partner.name) family.push({ label: "Step-mother", value: partner });
      }
    }

    // Siblings
    if (character.name === c.father || character.name === c.mother) {
      if (c.gender === "Male") family.push({ label: "Son", value: c });
      if (c.gender === "Female") family.push({ label: "Daughter", value: c });
    }
    if ((c.father && character.father === c.father) && (c.mother && character.mother === c.mother)) {
      if (c.gender === "Male") family.push({ label: "Brother", value: c });
      if (c.gender === "Female") family.push({ label: "Sister", value: c });
    } else if ((c.father && character.father === c.father) || (c.mother && character.mother === c.mother)) {
      if (c.gender === "Male") family.push({ label: "Half-brother", value: c });
      if (c.gender === "Female") family.push({ label: "Half-sister", value: c });
    }
  });

  relationships.filter(r => r.aCharacter.id === character.id || r.bCharacter.id === character.id).forEach(r => {
    // Spouses
    if (r.relationship === "Spouse") {
      const spouse = r.aCharacter.id === character.id ? r.bCharacter : r.aCharacter;
      if (spouse.gender === "Male") {
        family.push({ label: "Husband", value: spouse });

        // Step-children through the husband
        const children = characters.filter(c => c.father === spouse.name && c.mother !== character.name);
        children.forEach(c => family.push({ label: c.gender === "Male" ? "Step-son" : "Step-daughter", value: c }));
      }
      if (spouse.gender === "Female") {
        family.push({ label: "Wife", value: spouse });

        //Step-children through the wife
        const children = characters.filter(c => c.mother === spouse.name && c.father !== character.name);
        children.forEach(c => family.push({ label: c.gender === "Male" ? "Step-son" : "Step-daughter", value: c }));
      }
    }

    // Lovers
    if (r.relationship === "Lover") family.push({ label: "Lover", value: r.aCharacter.id === character.id ? r.bCharacter : r.aCharacter });
  });

  return family.sort((a, b) => {
    const partsA = a.value.name.trim().toLowerCase().split(" ");
    const partsB = b.value.name.trim().toLowerCase().split(" ");

    const lastA = partsA[partsA.length - 1];
    const lastB = partsB[partsB.length - 1];

    const lastCompare = lastA.localeCompare(lastB);
    if (lastCompare !== 0) return lastCompare;

    const firstA = partsA[0];
    const firstB = partsB[0];

    return firstA.localeCompare(firstB);
  });
}