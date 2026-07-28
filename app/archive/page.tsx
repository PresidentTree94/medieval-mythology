import { navs } from "@/data/navData";
import Hero from "@/components/Hero";
import Decor from "@/components/Decor";
import Table from "@/components/Table";
import { createClient } from "@/lib/server";
import { Book } from "@/types/BookType";
import { Character } from "@/types/CharacterType";
import { Inspiration } from "@/types/InspirationType";
import { Kingdom } from "@/types/KingdomType";
import { Deity } from "@/types/DeityType";
import { Myth } from "@/types/MythType";

export default async function Archive() {

  const supabase = await createClient();

  const { data: characterData, error: characterError } = await supabase.from("characters").select("*, inspiration:inspirations (id, name), homeland:kingdoms!characters_homeland_fkey (id, name), residence:kingdoms!characters_residence_fkey (id, name)");
  if (characterError) console.error(characterError);

  const { data: inspirationData, error: inspirationError } = await supabase.from("inspirations").select().order("name");
  if (inspirationError) console.error(inspirationError);

  const { data: kingdomData, error: kingdomError } = await supabase.from("kingdoms").select("*, deity:pantheon (id, epithet)").order("name");
  if (kingdomError) console.error(kingdomError);

  const { data: pantheonData, error: pantheonError } = await supabase.from("pantheon").select().order("epithet");
  if (pantheonError) console.error(pantheonError);

  const { data: mythData, error: mythError } = await supabase.from("myths").select().order("title");
  if (mythError) console.error(mythError);

  const sortedCharacters = (characterData ?? []).sort((a, b) => {
    const lastA = a.name.trim().split(" ").slice(-1)[0].toLowerCase();
    const lastB = b.name.trim().split(" ").slice(-1)[0].toLowerCase();
    return lastA.localeCompare(lastB);
  });

  const books: Record<string, Book<any>> = {
    characters: {
      headings: ["Name", "Inspiration", "Residence"],
      data: sortedCharacters as Character[],
      empty: {
        name: "",
        pronunciation: "",
        meaning: "",
        gender: "",
        markers: [] as string[],
        inspiration: null,
        homeland: null,
        residence: null
      } as Character
    },
    inspirations: {
      headings: ["Name", "Role", "Homeland"],
      data: (inspirationData ?? []) as Inspiration[],
      empty: {
        name: "",
        meaning: "",
        role: "",
        homeland: "",
        markers: [] as string[]
      } as Inspiration
    },
    kingdoms: {
      headings: ["Name", "Crest", "Government"],
      data: (kingdomData ?? []) as Kingdom[],
      empty: {
        name: "",
        crest: "",
        medieval: "",
        mythology: "",
        language: "",
        government: "",
        deity: null
      } as Kingdom
    },
    pantheon: {
      headings: ["Epithet", "Domains", "Blessing"],
      data: (pantheonData ?? []) as Deity[],
      empty: {
        epithet: "",
        domains: [] as string[],
        blessing: "",
        description: ""
      } as Deity
    },
    myths: {
      headings: ["Title", "Source", "Summary"],
      data: (mythData ?? []) as Myth[],
      empty: {
        title: "",
        source: "",
        summary: ""
      } as Myth
    }
  };

  const total = 
    books.characters.data.length +
    books.inspirations.data.length +
    books.kingdoms.data.length +
    books.pantheon.data.length +
    books.myths.data.length;

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