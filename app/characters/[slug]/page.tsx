import Image from "next/image";
import Link from "next/link";
import Decor from "@/components/Decor";
import { getCharacters, getRelationships, getMythInspirationsByInspiration } from "@/lib/serverQueries";
import { buildFamily } from "@/utils/buildFamily";
import KingdomComp from "@/components/KingdomComp";
import { markersRecord } from "@/utils/markersRecord";

export default async function CharacterDetail({ params }: { params: { slug: string } }) {

  const { slug } = await params;
  const characters = await getCharacters({ orderBy: "name", ascending: true });
  const relationships = await getRelationships();
  const index = characters.findIndex(c => c.id === Number(slug));
  const character = characters.splice(index, 1)[0];
  const myths = await getMythInspirationsByInspiration(character.inspiration?.id ?? 0);

  const stats = [
    { label: "Role", value: "" },
    { label: "Gender", value: character?.gender },
    { label: "Homeland", value: character?.homeland?.name },
    { label: "Residence", value: character?.residence?.name }
  ];

  const family = buildFamily(character, characters, relationships);

  return (
    <main>
      <section className="relative bg-foreground-dark text-center">
        <Image src="/sunset.jpg" alt="Sunset" fill sizes="100%" className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-dark/85 via-foreground-dark/70 to-foreground-dark"></div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 lg:px-10 pt-25 md:pt-30 pb-15 md:pb-20">
          <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-[oklch(0.72_0.150_80)]/40 bg-background-dark max-w-md w-full mx-auto lg:mx-0">
            <Image src="/royal.jpg" alt="Character" fill sizes="100%" className="object-cover object-top" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-card">{character?.name}</h1>
            <p className="text-background-light mt-1 text-sm">({character.pronunciation})</p>
            <div className="flex flex-wrap justify-center gap-2 text-card my-3">
              {character.markers.map((m, index) => (
                <i key={index} className={`${markersRecord[m]}`}></i>
              ))}
            </div>
            <span className="text-xl italic text-background-dark mb-6 block">Inspired by {character?.inspiration?.name} of {character?.inspiration?.homeland.split(" ")[0]}</span>
            <Decor className="w-40" icon="ri-quill-pen-line" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs tracking-[0.25em] uppercase font-display text-[oklch(0.78_0.140_82)]">{stat.label}</p>
                  <p className="text-card">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className="topper">
            <span className="font-display text-xs uppercase tracking-[0.5em] text-[oklch(0.50_0.120_76)]">Lineage</span>
            <h2 className="text-3xl md:text-4xl">Blood & Bond</h2>
          </div>
          <Decor className="w-40 !mx-0 mt-4 mb-8" icon="ri-organization-chart" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {family.map(f => (
              <Link key={f.value.id} href={`/characters/${f.value.id}`} className="card group p-4 flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full border border-border/60 overflow-hidden">
                  <Image src="/royal.jpg" alt="Character" fill sizes="100%" className="object-cover object-top" />
                </div>
                <div>
                  <span className="text-xs uppercase font-display tracking-[0.2em] text-[oklch(0.62_0.140_78)]">{f.label}</span>
                  <h3 className="text-sm text-foreground-dark">{f.value.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-card">
        <div>
          <div className="bg-background-light p-8 md:p-12 border border-[oklch(0.62_0.14_78)]/40 rounded-lg">
            <div className="topper">
              <span>Marginalia</span>
              <h2 className="text-2xl md:text-3xl mt-2 mb-4">The Roots of this Figure</h2>
              <Decor className="w-40 !mx-0" icon="ri-quill-pen-line" />
              <p className="max-w-3xl mt-5 mb-10">This character is a inspired by {character.inspiration?.name} of {character.inspiration?.homeland.split(" ")[0]}, a {character.inspiration?.role}. Below are the myths they are featured in and how they contribute to each one.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myths.map(m => {
                return (
                  <div key={m.myth.id} className="bg-card p-6 rounded-lg border border-border/70">
                    <h3 className="text-xs tracking-[0.35em] uppercase text-[oklch(0.34_0.14_25)]">{m.myth.title}</h3>
                    <p className="text-sm md:text-base text-foreground-light mt-1.5">{m.activities}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background-dark">
        <div className="space-y-8">
          {character.homeland && (
            <KingdomComp index={0} data={character.homeland} subtitle="Homeland" />
          )}
          {(character.residence && character.homeland?.id !== character.residence.id) && (
            <KingdomComp index={1} data={character.residence} subtitle="Residence" />
          )}
        </div>
      </section>
    </main>
  );
}