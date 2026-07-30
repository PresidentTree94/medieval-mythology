import { Modal } from "@/types/ModalType";
import { Inspiration } from "@/types/InspirationType";
import { useModalForm } from "@/hooks/useModalForm";
import FormField from "./FormField";

export default function InspirationModal(props: Modal<Inspiration>) {

  const { title, form, setForm, setBookData, closeModal } = props;
  const { handleChange, handleSubmit } = useModalForm("inspirations", form, setForm, setBookData, closeModal);

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(f => ({
      id: f.id,
      name: f.name,
      meaning: f.meaning,
      role: f.role,
      homeland: f.homeland,
      markers: f.markers
    })); }}>
      <FormField label="Name *">
        <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
      </FormField>
      <FormField label="Meaning">
        <input type="text" value={form.meaning} onChange={(e) => handleChange("meaning", e.target.value)} />
      </FormField>
      <FormField label="Role">
        <input type="text" value={form.role} onChange={(e) => handleChange("role", e.target.value)} />
      </FormField>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Location">
          <input type="text" value={form.homeland} onChange={(e) => handleChange("homeland", e.target.value)} />
        </FormField>
        <FormField label="Markers">
          <select multiple size={1} value={form.markers} onChange={(e) => handleChange("markers", Array.from(e.target.selectedOptions, o => o.value))}>
            <option value="Deity">Deity</option>
            <option value="Demigod">Demigod</option>
            <option value="Nymph">Nymph</option>
            <option value="Seer">Seer</option>
            <option value="Prophet">Prophet</option>
          </select>
        </FormField>
      </div>
    </form>
  );
}