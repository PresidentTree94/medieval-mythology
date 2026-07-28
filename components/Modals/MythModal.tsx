import { Modal } from "@/types/ModalType";
import { Myth } from "@/types/MythType";
import { createClient } from "@/lib/client";

export default function MythModal(props: Modal<Myth>) {

  const { title, form, setForm, setBookData, closeModal } = props;

  function handleChange<K extends keyof Myth>(field: K, value: Myth[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    const supabase = createClient();
    const { data, error } = await supabase.from("myths").upsert(form, { onConflict: "id" }).select();

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
        <label>Title *</label>
        <input type="text" required value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label>Source</label>
        <input type="text" value={form.source} onChange={(e) => handleChange("source", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label>Summary</label>
        <textarea className="resize-none" rows={3} value={form.summary} onChange={(e) => handleChange("summary", e.target.value)}></textarea>
      </div>
    </form>
  );
}