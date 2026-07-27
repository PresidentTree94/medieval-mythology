import { Modal } from "@/types/ModalType";
import { Kingdom } from "@/types/KingdomType";

export default function KingdomModal(props: Modal<Kingdom>) {

  const { title, form, setForm, closeModal } = props;

  return (
    <form id={`${title.toLowerCase}Form`}></form>
  );
}