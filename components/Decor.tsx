export default function Decor({ width, icon = "ri-star-line" }: { width: string; icon?: string; }) {
  return (
    <div className={`my-6 ${width} flex items-center mx-auto gap-4`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
      <i className={`${icon} text-sm text-[oklch(0.62_0.140_78)]`}></i>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
    </div>
  );
}