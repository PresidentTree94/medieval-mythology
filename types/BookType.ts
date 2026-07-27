export type Book<T> = {
  headings: string[];
  data: T[];
  empty: T;
}