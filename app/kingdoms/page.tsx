import Image from "next/image";
import Hero from "@/components/Hero";
import Decor from "@/components/Decor";
import { createClient } from "@/lib/server";
import { Kingdom } from "@/types/KingdomType";

export default async function Kingdoms() {

  const supabase = await createClient();
  const { data } = await supabase.from("kingdoms").select();
  const kingdoms = (data ?? []) as Kingdom[];

  return (
    <main>
      <Hero className="h-[520px] items-end" img="Kingdoms">
        <Decor className="mb-4 w-64" />
        <p className="text-xs md:text-sm font-display tracking-[0.5em] uppercase text-[oklch(0.84_0.115_84)]">Gazetteer of the Concordat</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-card mt-4 mb-5">Nine Realms of the Cracked Sky</h1>
        <p className="max-w-2xl mx-auto md:text-lg text-background-light italic">From the marble senate-halls of Veymere to the ice-holds of Hyperborea — every realm carries a medieval heritage and a mythic wound.</p>
      </Hero>
      <article>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="topper">
            <span>The Concordat of Nine Realms</span>
            <h2 className="text-3xl md:text-4xl mb-4">A treaty of unequal siblings</h2>
            <p className="max-w-3xl">Signed in the year 444 SA by Queen Seraphine Vael, the Concordat binds six great powers and three lesser holds. Each retains its throne, its tongue, and its gods — but shares the same broken sky.</p>
          </div>
          <div className="space-y-8 mt-14">
            {kingdoms.map((k, index) => {
              const stats = [
                { label: "Medieval", text: k.medieval },
                { label: "Mythology", text: k.mythology },
                { label: "Language", text: k.language },
                { label: "Crest", text: k.crest },
                { label: "Government", text: k.government },
                { label: "Deity", text: k.deity?.epithet }
              ];
              return (
                <div key={k.id} className={`card flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} group`}>
                  <div className="relative h-72 lg:h-auto lg:w-1/2 overflow-hidden">
                    <Image src="/landscape.jpg" alt="Landscape" fill sizes="100%" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 md:p-10 lg:w-1/2">
                    <p className="text-xs tracking-widest uppercase font-display text-[oklch(0.50_0.120_76)]">Subtitle</p>
                    <h3 className="text-3xl md:text-4xl text-foreground-dark my-2">{k.name}</h3>
                    <span className="italic text-foreground-light">Tagline</span>
                    <p className="mt-5 text-foreground-light">Description</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      {stats.map((s, index) => (
                        <div key={index} className="space-y-1">
                          <p className="text-xs tracking-[0.2em] uppercase font-display text-[oklch(0.34_0.140_25)]">{s.label}</p>
                          <p className="text-sm text-foreground-dark">{s.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </main>
  );
}