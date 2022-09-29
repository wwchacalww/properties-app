import { Property } from "../entity/property";

export type inputSearchDTO = {
  term: string;
  filter?: "description" | "code";
  page?: number;
  per_page?: number;
  sort_dir?: "asc" | "desc";
};

export type outputSearchDTO = {
  properties: Property[];
  term: string;
  filter: "description" | "code";
  page: number;
  page_start: number;
  page_end: number;
  per_page: number;
  sort_dir: "asc" | "desc";
  total: number;
};

export interface PropertyRepositoryInterface {
  add(property: Property): Promise<void>;
  all(): Promise<Property[]>;
  changeRoom(property: Property): Promise<void>;
  active(property: Property): Promise<void>;
  desactive(property: Property): Promise<void>;
  labeled(property: Property): Promise<void>;
  listForRoom(input: inputSearchDTO): Promise<void | outputSearchDTO>;
  searchForDescription(input: inputSearchDTO): Promise<void | outputSearchDTO>;
}
