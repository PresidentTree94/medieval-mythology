import { useState, useEffect } from "react";
import { Modal } from "@/types/ModalType";
import { Character } from "@/types/CharacterType";
import { Inspiration } from "@/types/InspirationType";
import { createClient } from "@/lib/client";

export default function CharacterModal(props: Modal<Character>) {

  const { title, form, setForm, closeModal } = props;

  const supabase = createClient();
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from("inspirations").select();
      setInspirations(data ?? []);
    }
    loadData();
  }, []);
   
  function handleChange<K extends keyof Character>(field: K, value: Character[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async () => {
    await supabase.from("characters").upsert({ ...form, inspiration: form.inspiration?.id }, { onConflict: "id" });
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
        <div className="space-y-1.5 opacity-50">
          <label>Markers</label>
          <select multiple size={1} disabled>
            <option>Deity</option>
            <option>Demigod</option>
            <option>Nymph</option>
            <option>Seer</option>
            <option>Prophet</option>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-50">
        <div className="space-y-1.5">
          <label>Homeland</label>
          <select defaultValue="" disabled>
            <option value="">Select a homeland...</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label>Residence</label>
          <select defaultValue="" disabled>
            <option value="">Select a residence...</option>
          </select>
        </div>
      </div>
    </form>
  );
}