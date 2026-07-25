import { navs } from "@/data/navData";
import Hero from "@/components/Hero";
import Decor from "@/components/Decor";
import Table from "@/components/Table";
type BookConfig<T> = {
  headings: string[];
  data: T[];
  empty: T;
};

export default function Archive() {

  const books: Record<string, BookConfig<any>> = {
    characters: {
      headings: ["Name", "Inspiration", "Residence"],
      data: [{ name: "Name"/*, inspiration: "Inspiration", residence: "Residence"*/ }],
      empty: { name: "" }
    },
    kingdoms: {
      headings: ["Name", "Crest", "Government"],
      data: [{ name: "Name"/*, crest: "Crest", government: "Government"*/ }],
      empty: { name: "" }
    },
    pantheon: {
      headings: ["Patron", "Domains", "Blessing"],
      data: [{ patron: "Patron"/*, domains: "Domains", blessing: "Blessing"*/ }],
      empty: { patron: "" }
    },
    myths: {
      headings: ["Title", "Source", "Summary"],
      data: [{ title: "Title"/*, source: "Source", summary: "Summary"*/ }],
      empty: { title: "" }
    }
  };

  const total = books.characters.data.length + books.kingdoms.data.length + books.pantheon.data.length + books.myths.data.length;

  return (
    <main>
      <Hero className="h-[520px] items-end" img="archive">
        <Decor className="mb-4 w-64" icon="ri-quill-pen-line" />
        <p className="text-xs md:text-sm font-display tracking-[0.5em] uppercase text-[oklch(0.84_0.115_84)]">{total} Entries Across Four Books</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-card mt-4 mb-5">The Grand Archive</h1>
        <p className="max-w-2xl mx-auto md:text-lg text-background-light italic">A complete index of every entry across the four books of the codex — characters, kingdoms, pantheon, and myths.</p>
      </Hero>
      <div className="bg-card/95 backdrop-blur border-b border-border/60 sticky top-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex gap-1 py-3 overflow-auto">
          {Object.entries(navs).map(([key, n]) => (
            <a key={key} href={`#${key}`} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.3em] uppercase font-display text-foreground-light hover:bg-background-light hover:text-[oklch(0.34_0.140_25)] transition-colors`}><i className={`${n.icon} text-sm`}></i>{n.title}</a>
          ))}
        </div>
      </div>
      <article className="space-y-24 md:space-y-32">
        {Object.entries(books).map(([key, b]) => (
          <div key={key}>
            <Table nav={navs[key]} book={b} />
          </div>
        ))}
      </article>
    </main>
  );
}