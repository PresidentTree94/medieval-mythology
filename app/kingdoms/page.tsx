import Image from "next/image";
import Hero from "@/components/Hero";
import Decor from "@/components/Decor";
import { getKingdoms } from "@/lib/serverQueries";
import KingdomComp from "@/components/KingdomComp";

export default async function Kingdoms() {

  const kingdoms = await getKingdoms({ orderBy: "name", ascending: true });

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
            {kingdoms.map((k, index) => (
              <KingdomComp key={k.id} index={index} data={k} />
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}