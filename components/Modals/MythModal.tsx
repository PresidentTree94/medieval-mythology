import { Modal } from "@/types/ModalType";
import { Myth } from "@/types/MythType";
import { useModalForm } from "@/hooks/useModalForm";
import FormField from "./FormField";

export default function MythModal(props: Modal<Myth>) {

  const { title, form, setForm, setBookData, closeModal } = props;
  const { handleChange, handleSubmit } = useModalForm("myths", form, setForm, setBookData, closeModal);

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
    </form>
  );
}