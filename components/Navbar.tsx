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
    <header className={`fixed top-0 inset-x-0 z-1 ${isActive ? "bg-card/95 backdrop-blur border-b border-border/60" : "bg-transparent"} transition-colors duration-500`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:px-10 font-display max-w-7xl mx-auto">
        <div className="h-20 flex items-center justify-between px-6 lg:px-0">
          <Link href="/" className="flex items-center gap-3">
            <div className={`w-10 h-10 border ${isActive ? "border-[oklch(0.62_0.140_78)]" : "border-background-light/70"} rounded-full flex items-center justify-center transition-colors duration-500`}>
              <i className={`ri-quill-pen-line text-lg ${isActive ? "text-[oklch(0.50_0.120_76)]" : "text-card"} transition-colors duration-500`}></i>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl ${isActive ? "text-[oklch(0.13_0.014_26)]" : "text-card"} transition-colors duration-500`}>Medieval</span>
              <span className={`text-xs tracking-widest ${isActive ? "text-[oklch(0.50_0.120_76)]" : "text-[oklch(0.84_0.115_84)]"} transition-colors duration-500`}>Mythology</span>
            </div>
          </Link>
          <button className={`lg:hidden w-10 h-10 border ${isActive ? "border-border" : "border-background-light/60"} rounded-md transition-colors duration-500`} onClick={() => setOpen(!open)}>
            <i className={`${open ? "ri-close-line" : "ri-menu-line"} text-xl ${isActive ? "text-[oklch(0.18_0.018_28)]" : "text-card"} transition-colors duration-500`}></i>
          </button>
        </div>
        <nav className={`${open ? "flex" : "hidden lg:flex"} flex-col lg:flex-row gap-1 py-4 lg:py-0 border-t lg:border-t-0 border-border/60 text-sm uppercase tracking-widest px-4 lg:px-0`}>
          {Object.entries(navs).filter(([key, n]) => n.title !== "Inspirations").map(([key, n]) => (
            <Link key={key} href={`/${n.title.toLowerCase()}`} className={`px-4 py-2 ${pathname === `/${n.title.toLowerCase()}` ? isActive ? "text-[oklch(0.34_0.140_25)]" : "text-[oklch(0.84_0.115_84)]" : isActive ? "text-foreground-light" : "text-background-light"} ${isActive ? "hover:text-[oklch(0.34_0.140_25)]" : "hover:text-[oklch(0.84_0.115_84)]"} transition-colors duration-500`} onClick={() => setOpen(false)}>{n.title}</Link>
          ))}
        </nav>
        <Link href="/archive" className={`${open ? "block" : "hidden lg:block"} px-5 py-2.5 rounded-md bg-[oklch(0.50_0.170_25)] hover:bg-[oklch(0.42_0.160_25)] transition-colors text-card text-xs tracking-[0.3em] uppercase mx-4 mb-4 lg:m-0 text-center`} onClick={() => setOpen(false)}>Enter the Archive</Link>
      </div>
    </header>
  );
}