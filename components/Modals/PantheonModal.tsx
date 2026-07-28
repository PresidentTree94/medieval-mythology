import { useState } from "react";
import { Modal } from "@/types/ModalType";
import { Deity } from "@/types/DeityType";
import { createClient } from "@/lib/client";

export default function PantheonModal(props: Modal<Deity>) {

  const { title, form, setForm, setBookData, closeModal } = props;

  const [domainInput, setDomainInput] = useState("");

  function addDomain() {
    const d = domainInput.trim();
    if (d && !form.domains.includes(d)) {
      setForm(prev => ({ ...prev, domains: [...prev.domains, d] }));
    }
    setDomainInput("");
  }

  function removeDomain(index: number) {
    setForm(prev => ({ ...prev, domains: prev.domains.filter((_, i) => i !== index)}));
  }

  function handleChange<K extends keyof Deity>(field: K, value: Deity[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    const supabase = createClient();
    const { data, error } = await supabase.from("pantheon").upsert(form, { onConflict: "id" }).select();

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
        <label>Epithet *</label>
        <input type="text" required value={form.epithet} onChange={(e) => handleChange("epithet", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label>Domains</label>
        <div className="flex gap-2">
          <input type="text" value={domainInput} onChange={(e) => setDomainInput(e.target.value)} />
          <button type="button" className="px-4 py-2.5 text-xs rounded-md bg-[oklch(0.52_0.090_55)] hover:bg-[oklch(0.44_0.082_55)] text-card uppercase font-display tracking-widest transition-colors cursor-pointer" onClick={addDomain}>Add</button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {form.domains.map((d, index) => (
            <span key={index} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[oklch(0.92_0.028_55)] text-[oklch(0.28_0.055_55)]">
              {d}
              <i className="ri-close-line" onClick={() => removeDomain(index)}></i>
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <label>Blessing</label>
        <input type="text" value={form.blessing} onChange={(e) => handleChange("blessing", e.target.value)}/>
      </div>
      <div className="space-y-1.5">
        <label>Description</label>
        <input type="text" value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
      </div>
    </form>
  );
}