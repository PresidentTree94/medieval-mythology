import { Kingdom } from "@/types/KingdomType";

export default function KingdomModal({ title, form, setForm }: {
  title: string; form: Kingdom; setForm: React.Dispatch<React.SetStateAction<Kingdom>>;
}) {
  return (
    <form id={`${title.toLowerCase}Form`}></form>
  );
}