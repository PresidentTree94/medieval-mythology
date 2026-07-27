export default function Modal({ title, edit, open, closeModal, children }: {
  title: string;
  edit: boolean;
  open: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`fixed inset-0 bg-foreground-dark/60 z-3 ${open ? "flex" : "hidden"} justify-center items-center gap-3 px-6 py-12`}>
      <div className="relative bg-card max-w-2xl w-full rounded-lg max-h-full border border-border/70 overflow-auto">
        <div className="sticky top-0 flex iems-center justify-between text-lg px-6 py-4 border-b border-border/70 bg-card">
          <h3 className="text-lg text-foreground-dark">New {title}</h3>
          <i className="ri-close-line text-foreground-light cursor-pointer" onClick={closeModal}></i>
        </div>
        {children}
        <div className="sticky bottom-0 flex justify-end gap-3 px-6 py-4 border-t border-border/70 text-sm uppercase font-display tracking-widest bg-card">
          <button type="button" className="px-5 py-2.5 rounded-md border border-border hover:bg-background-light text-foreground-light transition-colors cursor-pointer" onClick={closeModal}>Cancel</button>
          <button type="submit" form={`${title.toLowerCase()}Form`} className="px-5 py-2.5 rounded-md bg-[oklch(0.50_0.170_25)] hover:bg-[oklch(0.42_0.160_25)] text-card disabled:bg-background-dark disabled:text-foreground-light transition-colors cursor-pointer">{edit ? "Save Changes" : `Create ${title}`}</button>
        </div>
      </div>
    </div>
  );
}