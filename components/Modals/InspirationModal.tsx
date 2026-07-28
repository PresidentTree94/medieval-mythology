import { Modal } from "@/types/ModalType";
import { Inspiration } from "@/types/InspirationType";
import { createClient } from "@/lib/client";

export default function InspirationModal(props: Modal<Inspiration>) {

  const { title, form, setForm, setBookData, closeModal } = props;

  function handleChange<K extends keyof Inspiration>(field: K, value: Inspiration[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    const supabase = createClient();
    const { data, error } = await supabase.from("inspirations").upsert(form, { onConflict: "id" }).select();

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
  };

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="space-y-1.5">
        <label>Name *</label>
        <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label>Meaning</label>
        <input type="text" value={form.meaning} onChange={(e) => handleChange("meaning", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label>Role</label>
        <input type="text" value={form.role} onChange={(e) => handleChange("role", e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label>Location</label>
          <input type="text" value={form.location} onChange={(e) => handleChange("location", e.target.value)} />
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
    </form>
  );
}