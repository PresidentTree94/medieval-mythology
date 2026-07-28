import { useState, useEffect } from "react";
import { Modal } from "@/types/ModalType";
import { Kingdom } from "@/types/KingdomType";
import { Deity } from "@/types/DeityType";
import { createClient } from "@/lib/client";

export default function KingdomModal(props: Modal<Kingdom>) {

  const { title, form, setForm, setBookData, closeModal } = props;

  const supabase = createClient();
  const [deities, setDeities] = useState<Deity[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from("pantheon").select();
      setDeities(data ?? []);
    }
    loadData();
  }, []);

  function handleChange<K extends keyof Kingdom>(field: K, value: Kingdom[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    const { data, error } = await supabase.from("kingdoms").upsert({ ...form, deity: form.deity ? form.deity.id : null }, { onConflict: "id" }).select();

    if (error) {
      console.error(error);
      return;
    }

    if (!data || data.length === 0) return;

    const newRow = data[0];
    setBookData(prev => {
      const exists = prev.some(item => item.id === newRow.id);
      return exists ? prev.map(item => item.id === newRow.id ? newRow : item) : [...prev, newRow];
    });
    closeModal();
  }

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="space-y-1.5">
          <label>Name *</label>
          <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label>Medieval</label>
          <input type="text" value={form.medieval} onChange={(e) => handleChange("medieval", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label>Mythology</label>
          <input type="text" value={form.mythology} onChange={(e) => handleChange("mythology", e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label>Language</label>
          <input type="text" value={form.language} onChange={(e) => handleChange("language", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label>Crest</label>
          <input type="text" value={form.crest} onChange={(e) => handleChange("crest", e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label>Government</label>
          <input type="text" value={form.government} onChange={(e) => handleChange("government", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label>Deity</label>
          <select value={form.deity?.id ?? ""} onChange={(e) => handleChange("deity", deities.find(i => i.id === Number(e.target.value)) ?? null)}>
          <option value="">Select an deity...</option>
          {deities.map(i => (
            <option key={i.id} value={i.id}>{i.epithet}</option>
          ))}
        </select>
        </div>
      </div>
    </form>
  );
}