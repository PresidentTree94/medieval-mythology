import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-svh flex items-center justify-center">
        <Image src="/hero.jpg" alt="Medieval Landscape" fill sizes="100%" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.010_25)]/70 via-[oklch(0.08_0.010_25)]/40 to-[oklch(0.08_0.010_25)]/80"></div>
        <div className="relative text-center m-16">
          <p className="text-sm font-display uppercase tracking-[0.6em] text-[oklch(0.84_0.115_84)]">A Worldbuilding Archive</p>
          <div className="my-6 w-72 flex items-center mx-auto gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
            <i className="ri-star-line text-sm text-[oklch(0.62_0.140_78)]"></i>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
          </div>
          <h1 className="text-7xl text-[oklch(0.98_0.012_85)]">Medieval <span className="bg-clip-text text-transparent bg-gradient-to-b from-[oklch(0.84_0.115_84)] via-[oklch(0.62_0.140_78)] to-[oklch(0.40_0.100_72)]">Mythology</span></h1>
          <p className="text-2xl max-w-3xl mx-auto mt-6 italic text-[oklch(0.96_0.018_82)]">A living archive of fantasy kingdoms, mortals, and the pantheon that troubles them — drawn from the deep wells of Greek myth and the long shadow of the medieval world.</p>
        </div>
      </section>
      <section className="bg-[oklch(0.92_0.024_80)] py-32">
        <div className="text-center">
          <span className="font-display text-xs uppercase tracking-[0.5em] text-[oklch(0.50_0.120_76)]">Four Books of the Codex</span>
          <h2 className="text-5xl text-[oklch(0.08_0.010_25)] mt-3">A world remembered in four hands</h2>
          <div className="my-6 w-48 flex items-center mx-auto gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
            <i className="ri-quill-pen-line text-sm text-[oklch(0.62_0.140_78)]"></i>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.140_78)] to-transparent"></div>
          </div>
          <p className="text-lg italic text-[oklch(0.24_0.022_30)]">The archive is bound in four books — mortals, realms, gods, and stories — each keeping the others honest, each open to any wandering scholar.</p>
          <div className="mt-16 grid grid-cols-4 gap-6"></div>
        </div>
      </section>
      <section className="bg-[oklch(0.98_0.012_85)] py-32">Featured Characters</section>
      <section className="bg-[oklch(0.92_0.024_80)] py-32">Featured Kingdoms</section>
      <section className="bg-[oklch(0.08_0.010_25)] py-32">Featured Pantheon</section>
      <section className="bg-[oklch(0.96_0.018_82)] py-32">Featured Myths</section>
      <section className="bg-[oklch(0.92_0.024_80)] py-32">Quote?</section>
    </main>
  );
}
