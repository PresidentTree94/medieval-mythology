import Image from "next/image";
import Link from "next/link";
import { navs } from "@/data/navData";
import Decor from "@/components/Decor";
import CenterSection from "@/components/CenterSection";
import LeftSection from "@/components/LeftSection";
import InfoBlock from "@/components/InfoBlock";

export default function Home() {
  return (
    <main>
      {/*---HERO---*/}
      <section className="relative min-h-svh flex items-center justify-center">
        <Image src="/hero.jpg" alt="Medieval Landscape" fill sizes="100%" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-dark/70 via-foreground-dark/40 to-foreground-dark/80"></div>
        <div className="relative text-center m-20">
          <p className="text-xs md:text-sm font-display uppercase tracking-[0.6em] text-[oklch(0.84_0.115_84)]">A Worldbuilding Archive</p>
          <Decor width="w-72" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-card">Medieval <span className="gilded">Mythology</span></h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto mt-6 italic text-background-light">A living archive of fantasy kingdoms, mortals, and the pantheon that troubles them — drawn from the deep wells of Greek myth and the long shadow of the medieval world.</p>
        </div>
      </section>
      {/*---BOOKS---*/}
      <CenterSection
        tiny="Four Books of the Codex"
        title="A world remembered in four hands"
        icon="ri-quill-pen-line"
        text="The archive is bound in four books — mortals, realms, gods, and stories — each keeping the others honest, each open to any wandering scholar."
      >
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(navs).map(([key, n]) => (
            <Link key={key} href={`/${n.title.toLowerCase()}`} className="card group p-8 flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="w-14 h-14 bg-[oklch(0.92_0.040_25)] rounded-full flex items-center justify-center">
                  <i className={`${n.icon} text-2xl text-[oklch(0.26_0.110_25)]`}></i>
                </div>
                <span className="font-display text-xs tracking-widest uppercase text-[oklch(0.50_0.120_76)]">0 Entries</span>
              </div>
              <h3 className="text-2xl text-foreground-dark">{n.title}</h3>
              <p className="text-sm font-display tracking-widest uppercase text-[oklch(0.34_0.140_25)]">{n.tagline}</p>
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
          <div className="card group overflow-hidden">
            <div className="relative aspect-4/5 overflow-hidden">
              <Image src="/royal.jpg" alt="Royal" fill sizes="100%" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
            </div>
            <InfoBlock />
          </div>
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
          <div className="card group overflow-hidden h-96 relative flex items-end">
            <Image src="/castle.jpg" alt="Castle" fill sizes="100%" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground-dark/85 via-foreground-dark/30 to-transparent" />
            <InfoBlock isDark />
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href={`/${navs["kingdoms"].title.toLowerCase()}`} className="bg-[oklch(0.52_0.090_55)] text-card px-8 py-4 rounded-md text-xs font-display uppercase tracking-[0.35em] inline-flex items-center gap-2">All Nine Realms<i className="ri-arrow-right-line"></i></Link>
        </div>
      </CenterSection>
      {/*---PANTHEON---*/}
      <section className="bg-foreground-dark">
        <div>
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-display text-xs uppercase tracking-[0.5em] text-[oklch(0.78_0.140_82)]">The Pantheon</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl gilded mt-3 mb-6">Solaris broke the sky in three places</h2>
            <p className="md:text-lg italic text-background-dark">Twelve Radiants sit at the councils of heaven. One brother fell. The Chthonic gods keep the thresholds no mortal wishes to name.</p>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center gap-3 group">
              <div className="relative aspect-square w-full max-w-32 sm:w-40 rounded-full border-2 border-[oklch(0.72_0.150_80)]/40 group-hover:border-[oklch(0.78_0.140_82)] bg-background-light overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <Image src="/god.jpg" alt="God" fill sizes="100%" className="object-cover object-top" />
              </div>
              <p className="text-xs tracking-widest uppercase font-display text-[oklch(0.78_0.140_82)]">Subtitle</p>
              <h3 className="text-xl text-card">Title</h3>
              <span className="text-xs italic inline-block text-border">Tagline</span>
            </div>
          </div>
          <div className="text-center mt-14">
            <Link href={`/${navs["pantheon"].title.toLowerCase()}`} className="bg-[oklch(0.72_0.150_80)] text-foreground-dark px-8 py-4 rounded-md text-xs font-display uppercase tracking-[0.35em] inline-flex items-center gap-2">All Nine Realms<i className="ri-arrow-right-line"></i></Link>
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
          <div className="card group overflow-hidden">
            <div className="relative h-56 overflow-hidden">
              <Image src="/loom.jpg" alt="Loom" fill sizes="100%" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
            </div>
            <InfoBlock />
          </div>
        </div>
      </LeftSection>
      {/*---QUOTES---*/}
      <section className="bg-background-dark">Quote?</section>
    </main>
  );
}
