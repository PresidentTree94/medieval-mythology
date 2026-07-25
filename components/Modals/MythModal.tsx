import { Myth } from "@/types/MythType";

export default function MythModal({ title, form, setForm }: {
  title: string; form: Myth; setForm: React.Dispatch<React.SetStateAction<Myth>>;
}) {
  return (
    <form id={`${title.toLowerCase}Form`}></form>
  );
}