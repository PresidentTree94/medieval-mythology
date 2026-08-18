import Image from "next/image";
import Hero from "@/components/Hero";
import Decor from "@/components/Decor";
import { getMyths, getMythInspirations } from "@/lib/serverQueries";

export default async function Myths() {

  const myths = await getMyths({ orderBy: "title", ascending: true });
  const mythInspirations = await getMythInspirations();

  return (
    <main>
      <Hero className="h-[520px] items-end" img="Myths" position="object-center">
        <Decor className="mb-4 w-64" />
        <p className="text-xs md:text-sm font-display tracking-[0.5em] uppercase text-[oklch(0.84_0.115_84)]">Recorded Legends</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-card mt-4 mb-5">The Myths of Aetheria</h1>
        <p className="max-w-2xl mx-auto md:text-lg text-background-light italic">The great stories retold from the deep wells of Greek myth — each annotated with the classical roots and literary descendants that carry them forward.</p>
      </Hero>
      <article>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {myths.map(m => {
            const inspirations = mythInspirations.filter(i => i.myth === m.id);
            return (
            <div key={m.id} className="card group">
              <div className="relative h-56 overflow-hidden flex items-end">
                <Image src="/loom.jpg" alt="Loom" fill sizes="100%" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground-dark/70 to-transparent"></div>
                <div className="relative p-6">
                  <h3 className="text-xl text-card">{m.title}</h3>
                  <span className="text-sm italic inline-block text-background-light">{m.source}</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-foreground-light line-clamp-2">{m.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest font-display">
                  {inspirations.map(i => (
                    <span className="bg-[oklch(0.95_0.045_88)] text-[oklch(0.4_0.1_72)] px-3 py-1 rounded-full inline-block">{i.inspiration.name}</span>
                  ))}
                </div>
              </div>
            </div>
          )})}
        </div>
      </article>
    </main>
  );
}