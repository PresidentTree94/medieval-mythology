import Link from "next/link";

export default function LeftSection({ tiny, title, text, nav, children }: {
  tiny: string;
  title: string;
  text: string;
  nav: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background-light">
      <div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex-1 topper">
            <span>{tiny}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground-dark mt-3 mb-3">{title}</h2>
            <p className="md:text-lg italic text-foreground-light">{text}</p>
          </div>
          <Link href={`/${nav.toLowerCase()}`} className="font-display text-sm tracking-widest uppercase flex items-center gap-2 text-[oklch(0.34_0.140_25)] hover:text-[oklch(0.26_0.110_25)] transition-colors">All {nav}<i className="ri-arrow-right-line"></i></Link>
        </div>
        {children}
      </div>
    </section>
  );
}