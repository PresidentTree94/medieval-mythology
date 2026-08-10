import { useState, useEffect } from "react";
import { Modal } from "@/types/ModalType";
import { Character } from "@/types/CharacterType";
import { Inspiration } from "@/types/InspirationType";
import { Kingdom } from "@/types/KingdomType";
import { Social } from "@/types/SocialType";
import { markersRecord } from "@/utils/markersRecord";
import { useModalForm } from "@/hooks/useModalForm";
import FormField from "./FormField";
import { getCharacters, getInspirations, getKingdoms, getRelationshipsById } from "@/lib/clientQueries";
import { compareNames } from "@/utils/compareNames";

export default function CharacterModal(props: Modal<Character>) {

  const { title, form, setForm, setBookData, closeModal } = props;
  const { supabase, handleChange, handleSubmit } = useModalForm("characters", form, setForm, setBookData, closeModal);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);
  const [relationships, setRelationships] = useState<Social[]>([]);
  const [relationshipCharacterId, setRelationshipCharacterId] = useState<number | null>(null);
  const [relationshipType, setRelationshipType] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const characterData = await getCharacters();
      const sortedCharacters = characterData.sort((a, b) => compareNames(a.name, b.name));
      const index = sortedCharacters.findIndex(c => c.id === Number(form.id));
      sortedCharacters.splice(index, 1);
      setCharacters(sortedCharacters);
      const inspirationData = await getInspirations();
      setInspirations(inspirationData);
      const kingdomData = await getKingdoms();
      setKingdoms(kingdomData);
      if (form.id) {
        const relationshipData = await getRelationshipsById(form.id);
        setRelationships(relationshipData);
      }
    }
    loadData();
  }, [form.id]);

  async function addRelationship() {
    const bCharacter = characters.find(c => c.id === relationshipCharacterId);
    if (bCharacter && relationshipType) {
      const { data, error } = await supabase.from("relationships").insert({
        aCharacter: form.id,
        bCharacter: bCharacter.id,
        relationship: relationshipType
      }).select();

      if (error) {
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        setRelationships(prev => [...prev, {
          aCharacter: form,
          bCharacter: bCharacter,
          relationship: relationshipType
        }]);
        setRelationshipCharacterId(null);
        setRelationshipType("");
      }
    }
  }

  async function removeRelationship(index: number) {
    const { error } = await supabase.from("relationships").delete().or(
      `and(aCharacter.eq.${form.id},bCharacter.eq.${index}),and(aCharacter.eq.${index},bCharacter.eq.${form.id})`
    );

    if (error) {
      console.error(error);
      return;
    }

    setRelationships(prev => prev.filter(r => {
      const a = r.aCharacter.id;
      const b = r.bCharacter.id;
      return !((a === form.id && b === index) || (a === index && b === form.id));
    }))
  }

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(f => ({
      ...f,
      name: f.name.trim(),
      inspiration: f.inspiration?.id,
      homeland: f.homeland?.id,
      residence: f.residence?.id,
      timestamp: new Date().toISOString()
    })); }}>
      <FormField label="Name *">
        <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
      </FormField>
      <FormField label="Pronunciation">
        <input type="text" value={form.pronunciation} onChange={(e) => handleChange("pronunciation", e.target.value)} />
      </FormField>
      <FormField label="Meaning">
        <input type="text" value={form.meaning} onChange={(e) => handleChange("meaning", e.target.value)} />
      </FormField>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Gender">
          <select value={form.gender} onChange={(e) => handleChange("gender", e.target.value)}>
            <option value="">Select a gender...</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </FormField>
        <FormField label="Markers">
          <select multiple size={1} value={form.markers} onChange={(e) => handleChange("markers", Array.from(e.target.selectedOptions, o => o.value))}>
            {Object.keys(markersRecord).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </FormField>
      </div>
      <FormField label="Inspiration *">
        <select required value={form.inspiration?.id ?? ""} onChange={(e) => handleChange("inspiration", inspirations.find(i => i.id === Number(e.target.value)) ?? null)}>
          <option value="">Select an inspiration...</option>
          {inspirations.map(i => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </FormField>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Homeland">
          <select value={form.homeland?.id ?? ""} onChange={(e) => handleChange("homeland", kingdoms.find(k => k.id === Number(e.target.value)) ?? null)}>
            <option value="">Select a homeland...</option>
            {kingdoms.map(k => (
              <option key={k.id} value={k.id}>{k.name}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Residence">
          <select value={form.residence?.id ?? ""} onChange={(e) => handleChange("residence", kingdoms.find(k => k.id === Number(e.target.value)) ?? null)}>
            <option value="">Select a residence...</option>
            {kingdoms.map(k => (
              <option key={k.id} value={k.id}>{k.name}</option>
            ))}
          </select>
        </FormField>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Father">
          <input type="text" value={form.father} onChange={(e) => handleChange("father", e.target.value)} />
        </FormField>
        <FormField label="Mother">
          <input type="text" value={form.mother} onChange={(e) => handleChange("mother", e.target.value)} />
        </FormField>
      </div>
      {form.id && (
        <FormField label="Social Relationships">
          <div className="flex flex-col sm:flex-row gap-4">
            <select value={relationshipCharacterId ?? ""} onChange={(e) => setRelationshipCharacterId(Number(e.target.value))}>
              <option value="">Select a character...</option>
              {characters.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select value={relationshipType} onChange={(e) => setRelationshipType(e.target.value)}>
              <option value="">Select a relationship...</option>
              <option value="Spouse">Spouse</option>
              <option value="Lover">Lover</option>
            </select>
            <button type="button" className="px-4 py-2.5 text-xs rounded-md bg-[oklch(0.52_0.090_55)] hover:bg-[oklch(0.44_0.082_55)] text-card uppercase font-display tracking-widest transition-colors cursor-pointer" onClick={addRelationship}>Add</button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {relationships.map((r, i) => {
              const index = r.aCharacter.id === form.id ? r.bCharacter.id : r.aCharacter.id;
              return (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[oklch(0.92_0.028_55)] text-[oklch(0.28_0.055_55)]">
                  {r.aCharacter.id === form.id ? r.bCharacter.name.split(" ")[0] : r.aCharacter.name.split(" ")[0]} - {r.relationship}
                  <i className="ri-close-line" onClick={() => removeRelationship(index)}></i>
                </span>
              );
            })}
          </div>
        </FormField>
      )}
    </form>
  );
}