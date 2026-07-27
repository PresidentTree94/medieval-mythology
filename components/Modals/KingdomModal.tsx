import { Modal } from "@/types/ModalType";
import { Kingdom } from "@/types/KingdomType";

export default function KingdomModal(props: Modal<Kingdom>) {

  const { title, form, setForm, setBookData, closeModal } = props;

  function handleChange<K extends keyof Kingdom>(field: K, value: Kingdom[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {}

  return (
    <form id={`${title.toLowerCase}Form`}></form>
  );
}