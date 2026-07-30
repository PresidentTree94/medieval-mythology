import { useState, useEffect } from "react";
import { Modal } from "@/types/ModalType";
import { Kingdom } from "@/types/KingdomType";
import { Deity } from "@/types/DeityType";
import { useModalForm } from "@/hooks/useModalForm";
import FormField from "./FormField";

export default function KingdomModal(props: Modal<Kingdom>) {

  const { title, form, setForm, setBookData, closeModal } = props;
  const { supabase, handleChange, handleSubmit } = useModalForm("kingdoms", form, setForm, setBookData, closeModal);
  const [deities, setDeities] = useState<Deity[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from("pantheon").select().order("epithet");
      setDeities(data ?? []);
    }
    loadData();
  }, []);

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(f => ({
      ...f,
      deity: f.deity?.id
    })); }}>
      <FormField label="Name *">
        <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
      </FormField>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Medieval">
          <input type="text" value={form.medieval} onChange={(e) => handleChange("medieval", e.target.value)} />
        </FormField>
        <FormField label="Mythology">
          <input type="text" value={form.mythology} onChange={(e) => handleChange("mythology", e.target.value)} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Language">
          <input type="text" value={form.language} onChange={(e) => handleChange("language", e.target.value)} />
        </FormField>
        <FormField label="Crest">
          <input type="text" value={form.crest} onChange={(e) => handleChange("crest", e.target.value)} />
        </FormField>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Government">
          <input type="text" value={form.government} onChange={(e) => handleChange("government", e.target.value)} />
        </FormField>
        <FormField label="Deity">
          <select value={form.deity?.id ?? ""} onChange={(e) => handleChange("deity", deities.find(i => i.id === Number(e.target.value)) ?? null)}>
            <option value="">Select an deity...</option>
            {deities.map(i => (
              <option key={i.id} value={i.id}>{i.epithet}</option>
            ))}
          </select>
        </FormField>
      </div>
    </form>
  );
}