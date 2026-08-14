import { Character } from "@/types/CharacterType";
import { Social } from "@/types/SocialType";
import { compareNames } from "./compareNames";

type Relative = {
  label: string;
  value: Character;
}

export function buildFamily(
  character: Character, characters: Character[], relationships: Social[]
): Relative[] {

  const family: Relative[] = [];

  function pushLabel(relative: Character, maleLabel: string, femaleLabel: string) {
    family.push({ label: relative.gender === "Male" ? maleLabel : femaleLabel, value: relative });
  }

  characters.forEach(c => {
    // Parents
    if (character.father === c.name || character.mother === c.name) {
      pushLabel(c, "Father", "Mother");

      // Step-parents
      const union = relationships.find(r => (r.aCharacter.id === c.id || r.bCharacter.id === c.id) && r.relationship === "Spouse");
      if (union) {
        const partner = union.aCharacter.id === c.id ? union.bCharacter : union.aCharacter;
        if (partner.gender === "Male" && character.father !== partner.name) family.push({ label: "Step-father", value: partner });
        if (partner.gender === "Female" && character.mother !== partner.name) family.push({ label: "Step-mother", value: partner });
      }

      // Aunts and uncles
      const parentSiblings = characters.filter(p => ((c.father && p.father === c.father) || (c.mother && p.mother === c.mother)) && p.name !== c.name);
      parentSiblings.forEach(s => pushLabel(s, "Uncle", "Aunt"));
    }

    // Biological children
    if (character.name === c.father || character.name === c.mother) pushLabel(c, "Son", "Daughter");
    if ((c.father && character.father === c.father) || (c.mother && character.mother === c.mother)) {
      if ((c.father && character.father === c.father) && (c.mother && character.mother === c.mother)) pushLabel(c, "Brother", "Sister");
      else pushLabel(c, "Half-brother", "Half-sister");
      const niecesNephews = characters.filter(n => n.father === c.name || n.mother === c.name);
      niecesNephews.forEach(n => pushLabel(n, "Nephew", "Niece"));
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
        children.forEach(c => pushLabel(c, "Step-son", "Step-daughter"));
      }
      if (spouse.gender === "Female") {
        family.push({ label: "Wife", value: spouse });

        //Step-children through the wife
        const children = characters.filter(c => c.mother === spouse.name && c.father !== character.name);
        children.forEach(c => pushLabel(c, "Step-son", "Step-daughter"));
      }
    }

    // Lovers
    if (r.relationship === "Lover") family.push({ label: "Lover", value: r.aCharacter.id === character.id ? r.bCharacter : r.aCharacter });
  });

  return family.sort((a, b) => compareNames(a.value.name, b.value.name));
}