import { Property } from "../entity/property";

export type inputSearchDTO = {
  term: string;
  filter?: "description" | "code";
  page?: number;
  per_page?: number;
  sort_dir?: "asc" | "desc";
  status?: "on" | "off";
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

export type inputCreateDTO = {
  id?: string;
  code: string;
  description: string;
  room: string;
  status: boolean;
  page: number;
  line: number;
  labeled: boolean;
};

export type inputListAllDTO = Omit<inputSearchDTO, "term">;
export type outputListAllDTO = Omit<outputSearchDTO, "term">;

export interface PropertyRepositoryInterface {
  add(property: Property): Promise<void>;
  import(properties: inputCreateDTO[]): Promise<void>;
  all(input: inputListAllDTO): Promise<void | outputListAllDTO>;
  changeRoom(id: string, room: string): Promise<void>;
  active(id: string): Promise<void>;
  desactive(id: string): Promise<void>;
  labeled(id: string, labeled: boolean): Promise<void>;
  listForRoom(input: inputSearchDTO): Promise<void | outputSearchDTO>;
  searchForDescription(input: inputSearchDTO): Promise<void | outputSearchDTO>;
  search(term: string): Promise<void | Property[]>;
}
