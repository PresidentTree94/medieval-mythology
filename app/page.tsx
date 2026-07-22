import Image from "next/image";
import Link from "next/link";
import { navs } from "@/data/navData";
import CenterSection from "@/components/CenterSection";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-svh flex items-center justify-center">
        <Image src="/hero.jpg" alt="Medieval Landscape" fill sizes="100%" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.010_25)]/70 via-[oklch(0.08_0.010_25)]/40 to-[oklch(0.08_0.010_25)]/80"></div>
        <div className="relative text-center m-20">
          <p className="text-xs md:text-sm font-display uppercase tracking-[0.6em] text-[oklch(0.84_0.115_84)]">A Worldbuilding Archive</p>
          <div className="my-6 w-72 flex items-center mx-auto gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
            <i className="ri-star-line text-sm text-[oklch(0.62_0.140_78)]"></i>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-[oklch(0.98_0.012_85)]">Medieval <span className="bg-clip-text text-transparent bg-gradient-to-b from-[oklch(0.84_0.115_84)] via-[oklch(0.62_0.140_78)] to-[oklch(0.40_0.100_72)]">Mythology</span></h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto mt-6 italic text-[oklch(0.96_0.018_82)]">A living archive of fantasy kingdoms, mortals, and the pantheon that troubles them — drawn from the deep wells of Greek myth and the long shadow of the medieval world.</p>
        </div>
      </section>
      <CenterSection
        tiny="Four Books of the Codex"
        title="A world remembered in four hands"
        icon="ri-quill-pen-line"
        text="The archive is bound in four books — mortals, realms, gods, and stories — each keeping the others honest, each open to any wandering scholar."
      >
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(navs).map(([key, n]) => (
            <Link key={key} href={`/${n.title.toLowerCase()}`} className="bg-[oklch(0.98_0.012_85)] p-8 rounded-lg card-lift flex flex-col gap-4 group">
              <div className="flex justify-between">
                <div className="w-14 h-14 bg-[oklch(0.92_0.040_25)] rounded-full flex items-center justify-center">
                  <i className={`${n.icon} text-2xl text-[oklch(0.26_0.110_25)]`}></i>
                </div>
                <span className="font-display text-xs tracking-widest uppercase text-[oklch(0.50_0.120_76)]">0 Entries</span>
              </div>
              <h3 className="text-2xl text-[oklch(0.08_0.010_25)]">{n.title}</h3>
              <p className="text-sm font-display tracking-widest uppercase text-[oklch(0.34_0.140_25)]">{n.tagline}</p>
              <p className="flex-1 text-[oklch(0.24_0.022_30)]">{n.description}</p>
              <span className="font-display text-sm tracking-widest uppercase text-[oklch(0.50_0.120_76)] inline-flex items-center gap-2 group-hover:text-[oklch(0.34_0.140_25)] transition-colors duration-300">Consult<i className="ri-arrow-right-line"></i></span>
            </Link>
          ))}
        </div>
      </CenterSection>
      <section className="bg-[oklch(0.96_0.018_82)] py-32">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 flex-1">
              <span className="font-display text-xs uppercase tracking-[0.5em] text-[oklch(0.50_0.120_76)]">From the Character Ledger</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-[oklch(0.08_0.010_25)] mt-3">Faces beneath the crown</h2>
              <p className="md:text-lg italic text-[oklch(0.24_0.022_30)]">A handful of the mortals whose deeds are recorded — knights, sovereigns, witches, and rogues.</p>
            </div>
            <Link href={`/${navs["characters"].title.toLowerCase()}`} className="font-display text-sm tracking-widest uppercase flex items-center gap-2 text-[oklch(0.34_0.140_25)] hover:text-[oklch(0.26_0.110_25)] transition-colors">All {navs["characters"].title}<i className="ri-arrow-right-line"></i></Link>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[oklch(0.98_0.012_85)] rounded-lg border border-[oklch(0.86_0.030_78)]/70 hover:border-[oklch(0.72_0.150_80)] overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-4/5 overflow-hidden">
                <Image src="/royal.jpg" alt="Royal" fill sizes="100%" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 space-y-2">
                <p className="text-xs tracking-widest uppercase font-display text-[oklch(0.50_0.120_76)]">Kingdom</p>
                <h3 className="text-xl text-[oklch(0.08_0.010_25)]">Character</h3>
                <span className="text-sm italic inline-block text-[oklch(0.32_0.026_32)]">Tagline</span>
                <p className="mt-2 text-sm text-[oklch(0.24_0.022_30)]">Description</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CenterSection
        tiny="Gazetteer of the Concordat"
        title="Nine realms, one cracked sky"
        icon="ri-ancient-gate-line"
        text="From the gilded senate-houses of Veymere to the ice-holds of Hyperborea — each kingdom carries a distinct medieval heritage and a mythic burden."
      >
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="card-lift h-96 relative rounded-lg overflow-hidden flex items-end group">
            <Image src="/castle.jpg" alt="Castle" fill sizes="100%" className="object-cover object-top group-hover:scale-105 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.010_25)]/85 via-[oklch(0.08_0.010_25)]/30 to-transparent" />
            <div className="relative p-7">
              <p className="text-xs text-[oklch(0.84_0.115_84)] uppercase font-display tracking-widest">Location</p>
              <h3 className="text-2xl text-[oklch(0.98_0.012_85)] mt-2 mb-1">Kingdom</h3>
              <span className="text-sm italic inline-block text-[oklch(0.96_0.018_82)]">Tagline</span>
              <p className="text-sm text-[oklch(0.96_0.018_82)]/90 mt-3">Description</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href={`/${navs["kingdoms"].title.toLowerCase()}`} className="bg-[oklch(0.52_0.090_55)] text-[oklch(0.98_0.012_85)] px-8 py-4 rounded-md text-xs font-display uppercase tracking-[0.35em] inline-flex items-center gap-2">All Nine Realms<i className="ri-arrow-right-line"></i></Link>
        </div>
      </CenterSection>
      <section className="bg-[oklch(0.08_0.010_25)] py-32">Featured Pantheon</section>
      <section className="bg-[oklch(0.96_0.018_82)] py-32">Featured Myths</section>
      <section className="bg-[oklch(0.92_0.024_80)] py-32">Quote?</section>
    </main>
  );
}
