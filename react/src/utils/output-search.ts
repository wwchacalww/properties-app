import { PropertyEntity } from "../Services/dtos";

type inputSearch = {
  properties: PropertyEntity[];
  page?: number;
  per_page: number;
  sort_dir?: "asc" | "desc";
  status?: boolean;
  filter?: "description" | "room" | "code";
  term?: string;
};

export function outputSearch(input: inputSearch) {
  const {
    properties,
    per_page,
    sort_dir = "asc",
    status,
    page = 1,
    filter = "code",
    term = "",
  } = input;

  const itemsFiltered: PropertyEntity[] = [];

  properties.forEach((prop) => {
    if (status === undefined) {
      if (term == "") {
        itemsFiltered.push(prop);
      }
      if (
        term !== "" &&
        prop[filter].toUpperCase().search(term.toUpperCase()) >= 0
      ) {
        itemsFiltered.push(prop);
      }
    } else {
      if (prop.status === status) {
        if (term === "") {
          itemsFiltered.push(prop);
        }
        if (
          term !== "" &&
          prop[filter].toUpperCase().search(term.toUpperCase()) >= 0
        ) {
          itemsFiltered.push(prop);
        }
      }
    }
  });

  if (sort_dir === "asc") {
    itemsFiltered.sort((a, b) => {
      const aSort = a[filter].toUpperCase().replace('"', "");
      const bSort = b[filter].toUpperCase().replace('"', "");
      if (aSort > bSort) {
        return 1;
      }

      if (bSort > aSort) {
        return -1;
      }
      return 0;
    });
  }

  if (sort_dir === "desc") {
    itemsFiltered.sort((a, b) => {
      const aSort = a[filter].toUpperCase().replace('"', "");
      const bSort = b[filter].toUpperCase().replace('"', "");
      if (aSort > bSort) {
        return -1;
      }

      if (bSort > aSort) {
        return 1;
      }
      return 0;
    });
  }

  const total = itemsFiltered.length;
  const page_end = Math.ceil(total / per_page);

  const item_first = page * per_page - per_page;
  const item_last = page * per_page - 1;
  // const items = `${page * per_page - per_page} - ${page * per_page - 1}`;

  const items: PropertyEntity[] = [];
  itemsFiltered.forEach((property, index) => {
    if (index >= item_first && index <= item_last) {
      items.push(property);
    }
  });
  return {
    total,
    page_end,
    items,
    filter,
    term,
    sort_dir,
    per_page,
    status,
  };
}
