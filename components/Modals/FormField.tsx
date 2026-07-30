export default function FormField({ label, children }: { label: string; children: React.ReactNode; }) {
  return (
    <div className="space-y-1.5">
      <label>{label}</label>
      {children}
    </div>
  );
}