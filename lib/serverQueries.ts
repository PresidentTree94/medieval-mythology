import { createClient } from "./server";
import { Character } from "@/types/CharacterType";
import { Inspiration } from "@/types/InspirationType";
import { Kingdom } from "@/types/KingdomType";
import { Deity } from "@/types/DeityType";
import { Myth } from "@/types/MythType";
import { Social } from "@/types/SocialType";

export async function getCharacters({ orderBy = "timestamp", ascending = false } = {}): Promise<Character[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("characters").select("*, inspiration:inspirations (id, name, homeland), homeland:kingdoms!characters_homeland_fkey (id, name), residence:kingdoms!characters_residence_fkey (id, name)").order(orderBy, { ascending });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getInspirations(): Promise<Inspiration[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("inspirations").select("*").order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getKingdoms({ orderBy = "timestamp", ascending = false } = {}): Promise<Kingdom[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("kingdoms").select("*, deity:pantheon (id, epithet)").order(orderBy, { ascending });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getPantheon({ orderBy = "timestamp", ascending = false } = {}): Promise<Deity[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("pantheon").select("*").order(orderBy, { ascending });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getMyths({ orderBy = "timestamp", ascending = false } = {}): Promise<Myth[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("myths").select("*").order(orderBy, { ascending });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getRelationships(): Promise<Social[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("relationships").select("*, aCharacter:characters!relationships_aCharacter_fkey (id, name, gender),bCharacter:characters!relationships_bCharacter_fkey (id, name, gender)");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}