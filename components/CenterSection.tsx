export default function CenterSection({ tiny, title, icon, text, children }: {
  tiny: string;
  title: string;
  icon: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[oklch(0.92_0.024_80)] py-32">
      <div className="max-w-7xl mx-auto px-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-display text-xs uppercase tracking-[0.5em] text-[oklch(0.50_0.120_76)]">{tiny}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[oklch(0.08_0.010_25)] mt-3">{title}</h2>
          <div className="my-6 w-48 flex items-center mx-auto gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
            <i className={`${icon} text-sm text-[oklch(0.62_0.140_78)]`}></i>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
          </div>
          <p className="md:text-lg italic text-[oklch(0.24_0.022_30)]">{text}</p>
        </div>
        {children}
      </div>
    </section>
  );
}