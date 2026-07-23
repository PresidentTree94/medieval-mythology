import Decor from "./Decor";

export default function CenterSection({ tiny, title, icon, text, children }: {
  tiny: string;
  title: string;
  icon: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background-dark">
      <div>
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-display text-xs uppercase tracking-[0.5em] text-[oklch(0.50_0.120_76)]">{tiny}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground-dark mt-3">{title}</h2>
          <Decor width="w-48" icon={icon} />
          <p className="md:text-lg italic text-foreground-light">{text}</p>
        </div>
        {children}
      </div>
    </section>
  );
}