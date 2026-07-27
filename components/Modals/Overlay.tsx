export default function Overlay({ openValue, children }: { openValue: boolean; children: React.ReactNode; }) {
  return (
    <div className={`fixed inset-0 bg-foreground-dark/60 z-3 ${openValue ? "flex" : "hidden"} justify-center items-center gap-3 px-6 py-12`}>
      {children}
    </div>
  );
}