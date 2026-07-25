import { Diety } from "@/types/DietyType";

export default function PantheonModal({ title, form, setForm }: {
  title: string; form: Diety; setForm: React.Dispatch<React.SetStateAction<Diety>>;
}) {
  return (
    <form id={`${title.toLowerCase}Form`}></form>
  );
}