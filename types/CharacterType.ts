import { Inspiration } from "./InspirationType";

export type Character = {
  id: number;
  name: string;
  pronunciation: string;
  meaning: string;
  gender: string;
  //markers: string[];
  inspiration: Inspiration | null;
  //homeland_id: number | null;
  //residence_id: number | null;
}