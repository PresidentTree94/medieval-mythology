import { useState, useEffect } from "react";
import { Modal } from "@/types/ModalType";
import { Character } from "@/types/CharacterType";
import { Inspiration } from "@/types/InspirationType";
import { Kingdom } from "@/types/KingdomType";
import { createClient } from "@/lib/client";

export default function CharacterModal(props: Modal<Character>) {

  const { title, form, setForm, setBookData, closeModal } = props;

  const supabase = createClient();
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data: inspirationData } = await supabase.from("inspirations").select();
      setInspirations(inspirationData ?? []);
      const { data: kingdomData } = await supabase.from("kingdoms").select();
      setKingdoms(kingdomData ?? []);
    }
    loadData();
  }, []);
   
  function handleChange<K extends keyof Character>(field: K, value: Character[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    const { data, error } = await supabase.from("characters").upsert({
      ...form,
      inspiration: form.inspiration?.id,
      homeland: form.homeland?.id,
      residence: form.residence?.id
    }, { onConflict: "id" }).select();

    if (!data || data.length === 0) return;

    const newRow = data[0];
    setBookData(prev => {
      const exists = prev.some(item => item.id === newRow.id);
      return exists ? prev.map(item => item.id === newRow.id ? newRow : item) : [...prev, newRow];
    });
    closeModal();
  };

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="space-y-1.5">
        <label>Name *</label>
        <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label>Pronunication</label>
        <input type="text" value={form.pronunciation} onChange={(e) => handleChange("pronunciation", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label>Meaning</label>
        <input type="text" value={form.meaning} onChange={(e) => handleChange("meaning", e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label>Gender</label>
          <select value={form.gender} onChange={(e) => handleChange("gender", e.target.value)}>
            <option value="">Select a gender...</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label>Markers</label>
          <select multiple size={1} value={form.markers} onChange={(e) => handleChange("markers", Array.from(e.target.selectedOptions, o => o.value))}>
            <option value="Deity">Deity</option>
            <option value="Demigod">Demigod</option>
            <option value="Nymph">Nymph</option>
            <option value="Seer">Seer</option>
            <option value="Prophet">Prophet</option>
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label>Inspiration *</label>
        <select required value={form.inspiration?.id ?? ""} onChange={(e) => handleChange("inspiration", inspirations.find(i => i.id === Number(e.target.value)) ?? null)}>
          <option value="">Select an inspiration...</option>
          {inspirations.map(i => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label>Homeland</label>
          <select value={form.homeland?.id ?? ""} onChange={(e) => handleChange("homeland", kingdoms.find(k => k.id === Number(e.target.value)) ?? null)}>
            <option value="">Select a homeland...</option>
            {kingdoms.map(k => (
              <option key={k.id} value={k.id}>{k.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label>Residence</label>
          <select value={form.residence?.id ?? ""} onChange={(e) => handleChange("residence", kingdoms.find(k => k.id === Number(e.target.value)) ?? null)}>
            <option value="">Select a residence...</option>
            {kingdoms.map(k => (
              <option key={k.id} value={k.id}>{k.name}</option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}