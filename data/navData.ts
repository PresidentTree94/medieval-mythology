export type NavType = {
  title: string;
  icon: string;
  tagline: string;
  description: string;
}

export const navs: Record<string, NavType> = {
  characters: {
    title: "Characters",
    icon: "ri-user-heart-line",
    tagline: "Monarchs, mages, and outlaws.",
    description: "Living dossiers of the mortals who tread the ages — their oaths, their weapons, their inspirations."
  },
  kingdoms: {
    title: "Kingdoms",
    icon: "ri-ancient-gate-line",
    tagline: "Nine realms beneath the cracked sky.",
    description: "Full gazetteers of every realm: geography, culture, military, and the medieval polities that shaped them."
  },
  pantheon: {
    title: "Pantheon",
    icon: "ri-sun-line",
    tagline: "The Radiant Twelve and the Chthonic Court.",
    description: "The gods of the archive, catalogued by domain and traced back to their Olympian ancestors."
  },
  myths: {
    title: "Myths",
    icon: "ri-book-open-line",
    tagline: "Recorded legends of the ages.",
    description: "Complete retellings of the great stories, annotated with their classical and literary provenance."
  }
};