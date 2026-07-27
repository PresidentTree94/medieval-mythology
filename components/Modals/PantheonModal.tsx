import { Modal } from "@/types/ModalType";
import { Diety } from "@/types/DietyType";

export default function PantheonModal(props: Modal<Diety>) {

  const { title, form, setForm, closeModal } = props;

  return (
    <form id={`${title.toLowerCase}Form`}></form>
  );
}