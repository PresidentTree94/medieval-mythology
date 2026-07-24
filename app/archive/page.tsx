import { navs } from "@/data/navData";
import Hero from "@/components/Hero";
import Decor from "@/components/Decor";

export default function Archive() {
  return (
    <main>
      <Hero className="h-[520px] items-end" img="archive">
        <Decor className="mb-4 w-64" icon="ri-quill-pen-line" />
        <p className="text-xs md:text-sm font-display tracking-[0.5em] uppercase text-[oklch(0.84_0.115_84)]">0 Entries Across Four Books</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-card mt-4 mb-5">The Grand Archive</h1>
        <p className="max-w-2xl mx-auto md:text-lg text-background-light italic">A complete index of every entry across the four books of the codex — characters, kingdoms, pantheon, and myths.</p>
      </Hero>
      <div className="bg-card/95 backdrop-blur border-b border-border/60 sticky top-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex gap-1 py-3 overflow-auto">
          {Object.entries(navs).map(([key, n]) => (
            <a key={key} href={`#${key}`} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.3em] uppercase font-display text-foreground-light hover:bg-background-light hover:text-[oklch(0.34_0.140_25)]"><i className={`${n.icon} text-sm`}></i>{n.title}</a>
          ))}
        </div>
      </div>
      {Object.entries(navs).map(([key, n]) => (
        <section key={key} id={key}>
          <div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[oklch(0.92_0.040_25)]">
                    <i className={`${n.icon} text-[oklch(0.26_0.110_25)] text-xl`}></i>
                  </div>
                  <span className="text-xs tracking-[0.4em] uppercase font-display text-[oklch(0.50_0.120_76)]">0 Entries</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl my-2">{n.title}</h2>
                <p className="italic text-foreground-light">{n.description}</p>
              </div>
              <button className="flex items-center gap-2 px-5 py-3 rounded-md bg-[oklch(0.50_0.170_25)] text-card text-xs tracking-[0.3em] font-display uppercase"><i className="ri-add-line text-base"></i>Add {n.title[n.title.length - 1] === "s" ? n.title.slice(0, -1) : n.title}</button>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}