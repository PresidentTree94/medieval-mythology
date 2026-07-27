import { Deity } from "./DeityType";

export type Kingdom = {
  id: number;
  name: string;
  crest: string;
  government: string;
  deity: Deity | null;
}