export type PropertyEntity = {
  id: string;
  description: string;
  code: string;
  room: string;
  labeled: boolean;
  status: boolean;
  page: number;
  line: number;
};

export type outputSearchDTO = {
  properties: PropertyEntity[];
  term: string;
  filter: "description" | "code";
  page: number;
  page_start: number;
  page_end: number;
  per_page: number;
  sort_dir: "asc" | "desc";
  total: number;
};
