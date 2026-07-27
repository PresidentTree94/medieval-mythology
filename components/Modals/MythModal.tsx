import { Modal } from "@/types/ModalType";
import { Myth } from "@/types/MythType";

export default function MythModal(props: Modal<Myth>) {

  const { title, form, setForm, setBookData, closeModal } = props;

  function handleChange<K extends keyof Myth>(field: K, value: Myth[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {}

  return (
    <form id={`${title.toLowerCase}Form`}></form>
  );
}