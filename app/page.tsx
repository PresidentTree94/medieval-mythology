import Image from "next/image";
import Link from "next/link";
import { navs } from "@/data/navData";
import Hero from "@/components/Hero";
import Decor from "@/components/Decor";
import CenterSection from "@/components/CenterSection";
import LeftSection from "@/components/LeftSection";
import InfoBlock from "@/components/InfoBlock";
import { markersRecord } from "@/utils/markersRecord";
import * as sb from "@/lib/serverQueries";

export default async function Home() {

  const characters = await sb.getCharacters();
  const kingdoms = await sb.getKingdoms();
  const pantheon = await sb.getPantheon();
  const myths = await sb.getMyths();

  const navTaglines: Record<string, { tagline: string; count: number }> = {
    characters: { tagline: "Monarchs, mages, and outlaws.", count: characters?.length ?? 0 },
    kingdoms: { tagline: "Nine realms beneath the cracked sky.", count: kingdoms?.length ?? 0 },
    pantheon: { tagline: "The Radiant Twelve and the Chthonic Court.", count: pantheon?.length ?? 0 },
    myths: { tagline: "Recorded legends of the ages.", count: myths?.length ?? 0 }
  };

  return (
    <main>
      {/*---HERO---*/}
      <Hero className="min-h-svh items-center" img="Landscape">
        <p className="text-xs md:text-sm font-display uppercase tracking-[0.6em] text-[oklch(0.84_0.115_84)]">A Worldbuilding Archive</p>
        <Decor className="my-6 w-72" />
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-card">Medieval <span className="gilded">Mythology</span></h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto mt-6 italic text-background-light">A living archive of fantasy kingdoms, mortals, and the pantheon that troubles them — drawn from the deep wells of Greek myth and the long shadow of the medieval world.</p>
      </Hero>
      {/*---BOOKS---*/}
      <CenterSection
        tiny="Four Books of the Codex"
        title="A world remembered in four hands"
        icon="ri-quill-pen-line"
        text="The archive is bound in four books — mortals, realms, gods, and stories — each keeping the others honest, each open to any wandering scholar."
      >
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(navs).filter(([_, n]) => n.title !== "Inspirations").map(([key, n]) => (
            <Link key={key} href={`/${key}`} className="card group p-8 flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="w-14 h-14 bg-[oklch(0.92_0.040_25)] rounded-full flex items-center justify-center">
                  <i className={`${n.icon} text-2xl text-[oklch(0.26_0.110_25)]`}></i>
                </div>
                <span className="font-display text-xs tracking-widest uppercase text-[oklch(0.50_0.120_76)]">{navTaglines[key].count} Entries</span>
              </div>
              <h3 className="text-2xl text-foreground-dark">{n.title}</h3>
              <p className="text-sm font-display tracking-widest uppercase text-[oklch(0.34_0.140_25)]">{navTaglines[key].tagline}</p>
              <p className="flex-1 text-foreground-light">{n.description}</p>
              <span className="font-display text-sm tracking-widest uppercase text-[oklch(0.50_0.120_76)] inline-flex items-center gap-2 group-hover:text-[oklch(0.34_0.140_25)] transition-colors duration-300">Consult<i className="ri-arrow-right-line"></i></span>
            </Link>
          ))}
        </div>
      </CenterSection>
      {/*---CHARACTERS---*/}
      <LeftSection
        tiny="From the Character Ledger"
        title="Faces beneath the crown"
        text="A handful of the mortals whose deeds are recorded — knights, sovereigns, witches, and rogues."
        nav={navs["characters"].title}
      >
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.slice(0, 3).map(c => (
            <div key={c.id} className="card group">
              <div className="relative aspect-4/5 overflow-hidden flex items-start">
                <Image src="/royal.jpg" alt={c.name} fill sizes="100%" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground-dark/70 to-transparent"></div>
                <div className="relative p-4 self-end flex flex-wrap gap-2 text-card">
                  {c.markers.map((m, index) => (
                    <i key={index} className={markersRecord[m]}></i>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl text-foreground-dark">{c.name}</h3>
                <span className="text-foreground-light text-sm italic">Inspired by {c.inspiration?.name} of {c.inspiration?.homeland.split(" ")[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </LeftSection>
      {/*---KINGDOMS---*/}
      <CenterSection
        tiny="Gazetteer of the Concordat"
        title="Nine realms, one cracked sky"
        icon="ri-ancient-gate-line"
        text="From the gilded senate-houses of Veymere to the ice-holds of Hyperborea — each kingdom carries a distinct medieval heritage and a mythic burden."
      >
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {kingdoms.slice(0, 3).map(k => (
            <div key={k.id} className="card group h-96 relative flex items-end">
              <Image src="/castle.jpg" alt="Castle" fill sizes="100%" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground-dark/85 via-foreground-dark/30 to-transparent" />
              <div className="relative p-6">
                <h3 className="text-xl text-card">{k.name}</h3>
              <span className="text-background-light text-sm italic">Inspired by {k.medieval} and {k.mythology}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href={`/${navs["kingdoms"].title.toLowerCase()}`} className="bg-[oklch(0.52_0.090_55)] hover:bg-[oklch(0.44_0.082_55)] transition-colors text-card px-8 py-4 rounded-md text-xs font-display uppercase tracking-[0.35em] inline-flex items-center gap-2">All Nine Realms<i className="ri-arrow-right-line"></i></Link>
        </div>
      </CenterSection>
      {/*---PANTHEON---*/}
      <section className="bg-foreground-dark">
        <div>
          <div className="max-w-3xl mx-auto text-center topper">
            <span className="!text-[oklch(0.78_0.140_82)]">The Pantheon</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl gilded mt-3 mb-6">Solaris broke the sky in three places</h2>
            <p className="!text-background-dark">Twelve Radiants sit at the councils of heaven. One brother fell. The Chthonic gods keep the thresholds no mortal wishes to name.</p>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {pantheon.slice(0, 4).map(p => (
              <div key={p.id} className="flex flex-col items-center gap-3 group">
                <div className="relative aspect-square w-full max-w-32 sm:max-w-40 rounded-full border-2 border-[oklch(0.72_0.150_80)]/40 group-hover:border-[oklch(0.78_0.140_82)] bg-background-light overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <Image src="/god.jpg" alt="God" fill sizes="100%" className="object-cover object-top" />
                </div>
                <p className="text-xs tracking-widest uppercase font-display text-[oklch(0.78_0.140_82)]">{p.rank}</p>
                <h3 className="text-xl text-card">{p.epithet}</h3>
                <span className="text-sm italic inline-block text-border">Bestower of...</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href={`/${navs["pantheon"].title.toLowerCase()}`} className="bg-[oklch(0.72_0.150_80)] hover:bg-[oklch(0.62_0.140_78)] transition-colors text-foreground-dark px-8 py-4 rounded-md text-xs font-display uppercase tracking-[0.35em] inline-flex items-center gap-2">All Nine Realms<i className="ri-arrow-right-line"></i></Link>
          </div>
        </div>
      </section>
      {/*---MYTHS---*/}
      <LeftSection
        tiny="Recorded Legends"
        title="Stories told beside the hearth"
        text="Retellings of the great myths — annotated with their classical roots, medieval echoes, and literary descendants."
        nav={navs["myths"].title}
      >
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="card group">
            <div className="relative h-56 overflow-hidden">
              <Image src="/loom.jpg" alt="Loom" fill sizes="100%" />
            </div>
            <InfoBlock />
          </div>
        </div>
      </LeftSection>
      {/*---QUOTES---*/}
      <section className="bg-background-dark">
        <div className="!max-w-4xl text-center space-y-6">
          <i className="ri-double-quotes-l text-4xl text-[oklch(0.62_0.140_78)] inline-block"></i>
          <blockquote className="text-2xl md:text-3xl italic text-foreground-dark">The archive does not save the world. It only remembers it — in the wrong direction, patiently, for whoever comes next.</blockquote>
          <p className="text-xs tracking-[0.4em] uppercase font-display text-[oklch(0.34_0.140_25)]">— Prologue to the Medieval Mythology</p>
        </div>
      </section>
    </main>
  );
}
