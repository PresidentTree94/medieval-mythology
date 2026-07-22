"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navs } from "@/data/navData";

export default function Navbar() {

  const pathname = usePathname();
  const [open, setOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isActive = scrolled || open;

  return (
    <header className={`fixed top-0 inset-x-0 z-1 ${isActive ? "bg-[oklch(0.98_0.012_85)]/95 backdrop-blur border-b border-[oklch(0.86_0.030_78)]/60" : "bg-transparent"}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:px-10 font-display">
        <div className="h-20 flex items-center justify-between px-6 lg:px-0">
          <Link href="/" className="flex items-center gap-3">
            <div className={`w-10 h-10 border ${isActive ? "border-[oklch(0.62_0.140_78)]" : "border-[oklch(0.96_0.018_82)]/70"} rounded-full flex items-center justify-center`}>
              <i className={`ri-quill-pen-line text-lg ${isActive ? "text-[oklch(0.50_0.120_76)]" : "text-[oklch(0.98_0.012_85)]"}`}></i>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl ${isActive ? "text-[oklch(0.13_0.014_26)]" : "text-[oklch(0.98_0.012_85)]"}`}>Medieval</span>
              <span className={`text-xs tracking-widest ${isActive ? "text-[oklch(0.50_0.120_76)]" : "text-[oklch(0.84_0.115_84)]"}`}>Mythology</span>
            </div>
          </Link>
          <button className={`lg:hidden w-10 h-10 border ${isActive ? "border-[oklch(0.86_0.030_78)]" : "border-[oklch(0.96_0.018_82)]/60"} rounded-md`} onClick={() => setOpen(!open)}>
            <i className={`${open ? "ri-close-line" : "ri-menu-line"} text-xl ${isActive ? "text-[oklch(0.18_0.018_28)]" : "text-[oklch(0.98_0.012_85)]"}`}></i>
          </button>
        </div>
        <nav className={`${open ? "flex" : "hidden lg:flex"} flex-col lg:flex-row gap-1 py-4 lg:py-0 border-t lg:border-t-0 border-[oklch(0.86_0.030_78)] text-sm uppercase tracking-widest px-4 lg:px-0`}>
          {Object.entries(navs).map(([key, n]) => (
            <Link key={key} href={`/${n.title.toLowerCase()}`} className={`px-4 py-2 ${isActive ? "text-[oklch(0.24_0.022_30)]" : "text-[oklch(0.96_0.018_82)]"}`}>{n.title}</Link>
          ))}
        </nav>
        <Link href="/archive" className={`${open ? "block" : "hidden lg:block"} px-5 py-2.5 rounded-md bg-[oklch(0.50_0.170_25)] text-[oklch(0.98_0.012_85)] text-xs tracking-[0.3em] uppercase mx-4 mb-4 lg:m-0 text-center`}>Enter the Archive</Link>
      </div>
    </header>
  );
}