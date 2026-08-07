import { createClient } from "@/lib/client";

export function useModalForm<T extends { id: number }>(
  table: string,
  form: T,
  setForm: (fn: (prev: T) => T) => void,
  setBookData: (fn: (prev: T[]) => T[]) => void,
  closeModal: () => void
) {
  const supabase = createClient();

  function handleChange<K extends keyof T>(field: K, value: T[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(transform?: (f: T) => any) {
    const payload = transform ? transform(form) : form;

    const { data, error } = await supabase.from(table).upsert(payload, { onConflict: "id" }).select();

    if (error) { 
      console.error(error);
      return;
    }

    if (!data || data.length == 0) return;

    const newRow = data[0];
    setBookData(prev => {
      const exists = prev.some(item => item.id === newRow.id);
      return exists ? prev.map(item => item.id === newRow.id ? newRow : item) : [...prev, newRow];
    });
    closeModal();
  }

  return { supabase, handleChange, handleSubmit };
}