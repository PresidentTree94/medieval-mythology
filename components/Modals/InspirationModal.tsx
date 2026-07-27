import { Modal } from "@/types/ModalType";
import { Inspiration } from "@/types/InspirationType";
import { createClient } from "@/lib/client";

export default function InspirationModal(props: Modal<Inspiration>) {

  const { title, form, setForm, closeModal } = props;

  function handleChange<K extends keyof Inspiration>(field: K, value: Inspiration[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async () => {
    const supabase = createClient();
    await supabase.from("inspirations").upsert(form, { onConflict: "id" });
    closeModal();
  };

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="space-y-1.5">
        <label>Name *</label>
        <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)}  />
      </div>
      <div className="space-y-1.5">
        <label>Meaning</label>
        <input type="text" value={form.meaning} onChange={(e) => handleChange("meaning", e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label>Tagline</label>
        <input type="text" value={form.tagline} onChange={(e) => handleChange("tagline", e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label>Location</label>
          <input type="text" value={form.location} onChange={(e) => handleChange("location", e.target.value)} />
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
    </form>
  );
}