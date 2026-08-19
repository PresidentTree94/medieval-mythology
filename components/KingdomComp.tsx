import Image from "next/image"
import { Kingdom } from "@/types/KingdomType";

export default function KingdomComp({ data, index, subtitle }: { data: Kingdom; index: number; subtitle?: string; }) {

  const { language, crest, government, deity, name, medieval, mythology } = data;

  const stats = [
    { label: "Language", text: language },
    { label: "Crest", text: crest },
    { label: "Government", text: government },
    { label: "Deity", text: deity?.epithet }
  ];
  return (
    <div className={`card flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} group`}>
      <div className={`relative h-64 lg:h-auto lg:w-1/2 overflow-hidden`}>
        <Image src="/landscape.jpg" alt="Landscape" fill sizes="100%" />
      </div>
      <div className="p-8 md:p-10 lg:w-1/2">
        <p className="text-xs tracking-widest uppercase font-display text-[oklch(0.50_0.120_76)]">{subtitle ? subtitle : "Subtitle"}</p>
        <h3 className="text-3xl md:text-4xl text-foreground-dark my-2">{name}</h3>
        <span className="italic text-foreground-light">Inspired by medieval {medieval} and mythological {mythology}</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {stats.map((s, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs tracking-[0.2em] uppercase font-display text-[oklch(0.34_0.140_25)]">{s.label}</p>
              <p className="text-sm text-foreground-dark">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}