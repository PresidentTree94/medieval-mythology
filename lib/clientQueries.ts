import { createClient } from "./client";
import { Character } from "@/types/CharacterType";
import { Inspiration } from "@/types/InspirationType";
import { Kingdom } from "@/types/KingdomType";
import { Deity } from "@/types/DeityType";
import { Social } from "@/types/SocialType";
import { MythInsp } from "@/types/MythInspType";

export async function getCharacters(): Promise<Character[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("characters").select("*, inspiration:inspirations (id, name, homeland), homeland:kingdoms!characters_homeland_fkey (id, name), residence:kingdoms!characters_residence_fkey (id, name)").order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getInspirations(): Promise<Inspiration[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("inspirations").select("*").order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getKingdoms(): Promise<Kingdom[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("kingdoms").select("*, deity:pantheon (id, epithet)").order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getPantheon(): Promise<Deity[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("pantheon").select("*").order("epithet");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getRelationshipsById(id: number): Promise<Social[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("relationships").select("*, aCharacter:characters!relationships_aCharacter_fkey (id, name),bCharacter:characters!relationships_bCharacter_fkey (id, name)").or(`aCharacter.eq.${id},bCharacter.eq.${id}`);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getMythInspirationsByMythId(id: number): Promise<MythInsp[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("mythInsp").select("*, inspiration:inspirations (id, name, role, status)").eq("myth", id);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}