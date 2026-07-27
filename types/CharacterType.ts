import { Inspiration } from "./InspirationType";
import { Kingdom } from "./KingdomType";

export type Character = {
  id: number;
  name: string;
  pronunciation: string;
  meaning: string;
  gender: string;
  //markers: string[];
  inspiration: Inspiration | null;
  homeland: Kingdom | null;
  residence: Kingdom | null;
}