import { useState, useEffect } from "react";
import { Modal } from "@/types/ModalType";
import { Myth } from "@/types/MythType";
import { useModalForm } from "@/hooks/useModalForm";
import FormField from "./FormField";
import { Inspiration } from "@/types/InspirationType";
import { MythInsp } from "@/types/MythInspType";
import { getInspirations, getMythInspirationsByMythId } from "@/lib/clientQueries";

export default function MythModal(props: Modal<Myth>) {

  const { title, form, setForm, setBookData, closeModal } = props;
  const { supabase, handleChange, handleSubmit } = useModalForm("myths", form, setForm, setBookData, closeModal);
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [mythInspirations, setMythInspirations] = useState<MythInsp[]>([]);
  const [inspirationInput, setInspirationInput] = useState<Inspiration | null>(null);
  const [activities, setActivities] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const inspirationData = await getInspirations();
      setInspirations(inspirationData);
      if (form.id) {
        const mythInspData = await getMythInspirationsByMythId(form.id);
        setMythInspirations(mythInspData);
      }
    }
    loadData();
    setInspirationInput(null);
    setActivities("");
  }, [form.id]);

  async function addInspiration() {
    if (inspirationInput) {
      const { data: mythData, error: mythError } = await supabase.from("mythInsp").upsert({
        myth: form.id,
        inspiration: inspirationInput.id,
        activities: activities
      }).select();

      const { error: inspError } = await supabase.from("inspirations").update({ status: inspirationInput.status }).eq("id", inspirationInput.id);

      if (mythError) {
        console.error(mythError);
        return;
      }

      if (inspError) {
        console.error(inspError);
        return;
      }

      if (mythData && mythData.length > 0) {
        const newRow = mythData[0];
        const fullInspiration = inspirations.find(i => i.id === newRow.inspiration);
        const newItem: MythInsp = {
          myth: newRow.myth,
          inspiration: fullInspiration!,
          activities: newRow.activities
        };

        setMythInspirations(prev => {
          const exists = prev.some(item => item.inspiration.id === newItem.inspiration.id);
          return exists ? prev.map(item => item.inspiration.id === newItem.inspiration.id ? newItem : item) : [...prev, newItem];
        });
        setInspirationInput(null);
        setActivities("");
      }
    }
  }

  function updateInspiration(mythInsp: MythInsp) {
    setInspirationInput(mythInsp.inspiration);
    setActivities(mythInsp.activities);
  }

  async function removeInspiration(index: number) {
    const { error } = await supabase.from("mythInsp").delete().eq("myth", form.id).eq("inspiration", index);

    if (error) {
      console.error(error);
      return;
    }

    setMythInspirations(prev => prev.filter(item => item.inspiration.id !== index));
  }

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <FormField label="Title *">
        <input type="text" required value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
      </FormField>
      <FormField label="Source">
        <input type="text" value={form.source} onChange={(e) => handleChange("source", e.target.value)} />
      </FormField>
      <FormField label="Summary">
        <textarea className="resize-none" rows={3} value={form.summary} onChange={(e) => handleChange("summary", e.target.value)}></textarea>
      </FormField>
      {form.id && (<FormField label="Participants">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select value={inspirationInput?.id ?? ""} onChange={(e) => setInspirationInput(inspirations.find(i => i.id === Number(e.target.value)) ?? null)}>
            <option value="">Select an inspiration...</option>
            {inspirations.map(i => (
              <option key={i.id} value={i.id}>{i.name}</option>
            ))}
          </select>
          <input type="text" placeholder="Role of participant..." disabled value={inspirationInput?.role ?? ""} />
          <select value={inspirationInput?.status ? "TRUE" : "FALSE"} onChange={(e) => setInspirationInput(prev => prev ? { ...prev, status: e.target.value === "TRUE" } : null)}>
            <option value="TRUE">Show</option>
            <option value="FALSE">Hide</option>
          </select>
          <input type="text" placeholder="Activities of participant..." value={activities} onChange={(e) => setActivities(e.target.value)} className="col-span-full" />
        </div>
        <button type="button" className="mt-2.5 px-4 py-2.5 text-xs rounded-md bg-[oklch(0.52_0.090_55)] hover:bg-[oklch(0.44_0.082_55)] text-card uppercase font-display tracking-widest transition-colors cursor-pointer" onClick={addInspiration}>Add Participant</button>
        <div className="pt-2.5 space-y-2.5">
          {mythInspirations.sort((a, b) => a.inspiration.name.localeCompare(b.inspiration.name)).map((m, index) => (
            <div key={index} className="border border-border/70 p-3 rounded-md">
              <div className="flex justify-between items-start">
                <h3 className="text-sm text-foreground-dark">{m.inspiration.name}</h3>
                <div className="space-x-2">
                  <i className="ri-arrow-up-line cursor-pointer hover:text-[oklch(0.50_0.170_25)] transition-colors" onClick={() => updateInspiration(m)}></i>
                  <i className="ri-close-line cursor-pointer hover:text-[oklch(0.50_0.170_25)] transition-colors" onClick={() => removeInspiration(m.inspiration.id)}></i>
                </div>
              </div>
              <span className="text-xs text-foreground-light">{m.inspiration.role}</span>
              <p className="text-sm text-foreground-dark mt-1">{m.activities}</p>
            </div>
          ))}
        </div>
      </FormField>)}
    </form>
  );
}