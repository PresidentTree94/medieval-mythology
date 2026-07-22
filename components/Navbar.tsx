import Link from "next/link";
import { navs } from "@/data/navData";

export default function Navbar() {
  return (
    <header className={`fixed top-0 inset-x-0 z-1`}>
      <div className="flex items-center justify-between px-10 font-display">
        <div className="h-16 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[oklch(0.96_0.018_82)]/70 rounded-full flex items-center justify-center">
              <i className="ri-quill-pen-line text-lg text-[oklch(0.98_0.012_85)]"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl text-[oklch(0.98_0.012_85)]">Medieval</span>
              <span className="text-xs tracking-widest text-[oklch(0.84_0.115_84)]">Mythology</span>
            </div>
          </Link>
          {/*Mobile*/}
        </div>
        <nav className="flex gap-1 text-sm uppercase tracking-widest">
          {Object.entries(navs).map(([key, n]) => (
            <Link key={key} href={`/${n.title.toLowerCase()}`} className="px-4 py-2 text-[oklch(0.96_0.018_82)]">{n.title}</Link>
          ))}
        </nav>
        <Link href="/archive" className="px-5 py-2.5 rounded-md bg-[oklch(0.50_0.170_25)] text-[oklch(0.98_0.012_85)] text-xs tracking-widest uppercase">Enter the Archive</Link>
      </div>
    </header>
  );
}