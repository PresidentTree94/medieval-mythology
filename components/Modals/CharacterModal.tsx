import { Character } from "@/types/CharacterType";

export default function CharacterModal({ title, form, setForm }: {
  title: string; form: Character; setForm: React.Dispatch<React.SetStateAction<Character>>;
}) {

  const handleSubmit = async () => {};

  return (
    <form id={`${title.toLowerCase()}Form`} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="space-y-1.5">
        <label>Name</label>
        <input type="text" />
      </div>
      <div className="space-y-1.5">
        <label>Inspiration</label>
        <select></select>
      </div>
      <div className="space-y-1.5">
          <label>New Inspiration</label>
          <input type="text" />
      </div>
      <div className="space-y-1.5">
        <label>Residence</label>
        <select></select>
      </div>
    </form>
  );
}