import { Modal } from "@/types/ModalType";
import { Deity } from "@/types/DeityType";
import { createClient } from "@/lib/client";

export default function PantheonModal(props: Modal<Deity>) {

  const { title, form, setForm, setBookData, closeModal } = props;

  function handleChange<K extends keyof Deity>(field: K, value: Deity[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    const supabase = createClient();
    const { data } = await supabase.from("pantheon").upsert(form, { onConflict: "id" }).select();

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
        <label>Patron *</label>
        <input type="text" required value={form.patron} onChange={(e) => handleChange("patron", e.target.value)} />
      </div>
      <div className="space-y-1.5 opacity-50">
        <label>Domains</label>
        <input type="text" disabled />
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