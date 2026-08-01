"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Decor from "@/components/Decor";
import { createClient } from "@/lib/client";
import { Character } from "@/types/CharacterType";
import { Kingdom } from "@/types/KingdomType";
import { sortCharacters } from "@/utils/sortCharacters";
import { markersRecord } from "@/utils/markersRecord";
import FormField from "@/components/Modals/FormField";
import { useForm } from "@presidenttree94/form-utils";

export default function Characters() {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);

  useEffect(() => {
    const supabase = createClient();
    async function loadData() {
      const { data: charactersData } = await supabase.from("characters").select("*, inspiration:inspirations (id, name, homeland), homeland:kingdoms!characters_homeland_fkey (id, name), residence:kingdoms!characters_residence_fkey (id, name)");
      const sortedCharacters = sortCharacters(charactersData ?? []);
      setCharacters(sortedCharacters);
      const { data: kingdomsData } = await supabase.from("kingdoms").select("*").order("name");
      setKingdoms(kingdomsData ?? []);
    }
    loadData();
  }, []);

  const { form, elements } = useForm({
    gender: "All",
    markers: [] as string[],
    homeland: "All",
    residence: "All"
  }, {
    gender: { label: "Gender", options: ["All", "Female", "Male"] },
    markers: { label: "Markers", options: Object.keys(markersRecord), multi: true },
    homeland: { label: "Homeland", options: ["All", ...kingdoms.map(k => k.name)] },
    residence: { label: "Residence", options: ["All", ...kingdoms.map(k => k.name)] }
  });

  const filteredCharacters = characters.filter(c =>form.gender === "All" ? true : c.gender === form.gender)
  .filter(c => form.markers.length === 0 ? true : form.markers.every(m => c.markers.includes(m)))
  .filter(c => form.homeland === "All" ? true : c.homeland?.name === form.homeland)
  .filter(c => form.residence === "All" ? true : c.residence?.name === form.residence);

  return (
    <main>
      <Hero className="h-[520px] items-end" position="object-center" img="Council">
        <Decor className="mb-4 w-64" />
        <p className="text-xs md:text-sm font-display tracking-[0.5em] uppercase text-[oklch(0.84_0.115_84)]">The Character Ledger</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-card mt-4 mb-5">Faces beneath the Crown</h1>
        <p className="max-w-2xl mx-auto md:text-lg text-background-light italic">A living register of the mortals who walk the ages — sovereigns, warriors, mages, and rogues, catalogued alongside the myths that shaped them.</p>
      </Hero>
      <article>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
          <div className="bg-card p-8 rounded-lg border border-border/70">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(elements).map(([key, char]) => (
                <FormField key={key} label={char.label ?? ""}>
                  <select multiple={char.multi} size={1} value={char.value} onChange={(e) => char.setValue(char.multi ? Array.from(e.target.selectedOptions, o => o.value) : e.target.value)}>
                    {char.options?.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </FormField>
              ))}
            </div>
            <p className="mt-4 text-xs font-display tracking-[0.3em] uppercase text-[oklch(0.50_0.120_76)]">{filteredCharacters.length} of {characters.length} characters listed</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCharacters.map(c => (
              <div key={c.id} className="bg-card rounded-lg border border-border/70 overflow-hidden">
                <div className="relative aspect-4/5 overflow-hidden flex flex-col justify-between">
                  <Image src="/royal.jpg" alt={c.name} fill sizes="100%" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground-dark/70 to-transparent"></div>
                  <div className="relative p-4 self-end flex flex-wrap gap-2 text-card">
                    {c.markers.map((m, index) => (
                      <i key={index} className={`${markersRecord[m]}`}></i>
                    ))}
                  </div>
                  <div className="relative p-4">
                    <h3 className="text-xl text-card">{c.name}</h3>
                    <span className="text-background-light text-sm italic">Inspired by {c.inspiration?.name} of {c.inspiration?.homeland.split(" ")[0]}</span>
                  </div>
                </div>
                <div className="p-6"></div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}