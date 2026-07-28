import Hero from "@/components/Hero";
import Decor from "@/components/Decor";
import { createClient } from "@/lib/server";
import { Deity } from "@/types/DeityType";
import Image from "next/image";

export default async function Pantheon() {

  const supabase = await createClient();
  const { data } = await supabase.from("pantheon").select();
  const deities = (data ?? []) as Deity[];

  return (
    <main className="!bg-foreground-dark">
      <Hero className="h-[520px] items-end" img="Pantheon">
        <Decor className="mb-4 w-64" />
        <p className="text-xs md:text-sm font-display tracking-[0.5em] uppercase text-[oklch(0.84_0.115_84)]">The Radiant Twelve & the Chthonic Court</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-card mt-4 mb-5">The Pantheon of Aetheria</h1>
        <p className="max-w-2xl mx-auto md:text-lg text-background-light italic">Twelve Radiants sit at the councils of heaven. One brother fell. The Chthonic gods keep the thresholds no mortal wishes to name.</p>
      </Hero>
      <article>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="topper">
            <span className="!text-[oklch(0.78_0.140_82)]">The Cracked Sky</span>
            <h2 className="text-3xl md:text-4xl mb-4 gilded">A council still in session</h2>
            <p className="max-w-3xl !text-background-dark">The pantheon has not been complete since Melanor's fall. The vacant twelfth seat is left open at every council, and its cup is filled with wine that no one drinks.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deities.map(d => (
              <div key={d.id} className="border border-[oklch(0.50_0.120_76)]/40 hover:border-[oklch(0.72_0.150_80)] rounded-lg p-6 text-center group transition-color flex flex-col items-center justify-between gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-square w-full max-w-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[oklch(0.72_0.150_80)]/40 bg-background-dark transition-transform duration-500 group-hover:scale-105 group-hover:border-[oklch(0.78_0.140_82)]">
                    <Image src="/god.jpg" alt="God" fill sizes="100%" className="object-cover object-top" />
                  </div>
                  <h3 className="text-card text-xl">{d.epithet}</h3>
                  <div className="flex flex-wrap gap-1.5 justify-center font-display uppercase tracking-widest text-xs">
                    {d.domains.map((o, index) => (
                      <span key={index} className="px-2 py-0.5 rounded-full bg-[oklch(0.72_0.150_80)]/15 text-[oklch(0.84_0.115_84)]">{o}</span>
                    ))}
                  </div>
                </div>
                <span className="text-[oklch(0.78_0.140_82)] group-hover:text-[oklch(0.84_0.115_84)] flex items-center gap-2 text-sm font-display uppercase tracking-widest transition-colors">Attend<i className="ri-arrow-right-line"></i></span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}