import { Modal } from "@/types/ModalType";
import { Myth } from "@/types/MythType";

export default function MythModal(props: Modal<Myth>) {

  const { title, form, setForm, closeModal } = props;

  return (
    <form id={`${title.toLowerCase}Form`}></form>
  );
}