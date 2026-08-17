import { useState } from "react";
import { Modal } from "@/types/ModalType";
import { Deity } from "@/types/DeityType";
import { useModalForm } from "@/hooks/useModalForm";
import FormField from "./FormField";

export default function PantheonModal(props: Modal<Deity>) {

  const { title, form, setForm, setBookData, closeModal } = props;
  const { handleChange, handleSubmit } = useModalForm("pantheon", form, setForm, setBookData, closeModal);
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

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(f => ({
      ...f,
      timestamp: new Date().toISOString()
    })); }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Epithet *">
          <input type="text" required value={form.epithet} onChange={(e) => handleChange("epithet", e.target.value)} />
        </FormField>
        <FormField label="Rank">
          <select value={form.rank} onChange={(e) => handleChange("rank", e.target.value)}>
            <option value="">Select a rank...</option>
            <option value="Supreme">Supreme</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
          </select>
        </FormField>
      </div>
      <FormField label="Domains">
        <div className="flex gap-4">
          <input type="text" value={domainInput} onChange={(e) => setDomainInput(e.target.value)} />
          <button type="button" className="px-4 py-2.5 text-xs rounded-md bg-[oklch(0.52_0.090_55)] hover:bg-[oklch(0.44_0.082_55)] text-card uppercase font-display tracking-widest transition-colors cursor-pointer" onClick={addDomain}>Add</button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {form.domains && form.domains.map((d, index) => (
            <span key={index} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[oklch(0.92_0.028_55)] text-[oklch(0.28_0.055_55)]">
              {d}
              <i className="ri-close-line" onClick={() => removeDomain(index)}></i>
            </span>
          ))}
        </div>
      </FormField>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Inspiration">
          <input type="text" value={form.inspiration} onChange={(e) => handleChange("inspiration", e.target.value)} />
        </FormField>
        <FormField label="Blessing">
          <input type="text" value={form.blessing} onChange={(e) => handleChange("blessing", e.target.value)} />
        </FormField>
      </div>
      <FormField label="Description">
        <input type="text" value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
      </FormField>
    </form>
  );
}