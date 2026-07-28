import { Deity } from "./DeityType";

export type Kingdom = {
  id: number;
  name: string;
  crest: string;
  medieval: string;
  mythology: string;
  language: string;
  government: string;
  deity: Deity | null;
}