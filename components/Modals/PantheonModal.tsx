import { Modal } from "@/types/ModalType";
import { Diety } from "@/types/DietyType";

export default function PantheonModal(props: Modal<Diety>) {

  const { title, form, setForm, setBookData, closeModal } = props;

  function handleChange<K extends keyof Diety>(field: K, value: Diety[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {}

  return (
    <form id={`${title.toLowerCase}Form`}></form>
  );
}