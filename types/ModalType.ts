export type Modal<T> = {
  title: string;
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  closeModal: () => void;
}