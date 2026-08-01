import { useState, useEffect } from "react";
import { Modal } from "@/types/ModalType";
import { Character } from "@/types/CharacterType";
import { Inspiration } from "@/types/InspirationType";
import { Kingdom } from "@/types/KingdomType";
import { markersRecord } from "@/utils/markersRecord";
import { useModalForm } from "@/hooks/useModalForm";
import FormField from "./FormField";

export default function CharacterModal(props: Modal<Character>) {

  const { title, form, setForm, setBookData, closeModal } = props;
  const { supabase, handleChange, handleSubmit } = useModalForm("characters", form, setForm, setBookData, closeModal);
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data: inspirationData } = await supabase.from("inspirations").select().order("name");
      setInspirations(inspirationData ?? []);
      const { data: kingdomData } = await supabase.from("kingdoms").select().order("name");
      setKingdoms(kingdomData ?? []);
    }
    loadData();
  }, []);

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(f => ({
      ...f,
      inspiration: f.inspiration?.id,
      homeland: f.homeland?.id,
      residence: f.residence?.id
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
    </form>
  );
}