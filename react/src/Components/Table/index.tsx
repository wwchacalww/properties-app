import { Pagination } from "../Pagination";
import {
  SortAscending,
  SortDescending,
  ToggleLeft,
  ToggleRight,
} from "phosphor-react";

interface PropertyInterface {
  id: string;
  code: string;
  description: string;
  room: string;
  status: boolean;
  labeled: boolean;
  page: number;
  line: number;
}

interface TableProps {
  properties: PropertyInterface[];
  search: "room" | "description" | "";
  toggleStatus?: boolean;
  term?: string;
  filter?: "description" | "code" | "room";
  page: number;
  page_start: number;
  page_end: number;
  per_page: number;
  sort_dir?: "asc" | "desc";
  total: number;
  onChangePage: (page: number) => void;
  onFilter: (
    filter: "description" | "code" | "room",
    sort_dir: "asc" | "desc",
    search: "room" | "description" | ""
  ) => void;
  onChangeStatus: (status?: boolean) => void;
  onChangeItemStatus: (id: string, status: boolean) => Promise<boolean>;
}

export function Table(props: TableProps) {
  const {
    properties,
    toggleStatus,
    search,
    term = "",
    filter = "",
    per_page = 100,
    page,
    page_start,
    page_end,
    sort_dir = "asc",
    total,
    onChangePage,
    onFilter,
    onChangeStatus,
    onChangeItemStatus,
  } = props;

  return (
    <>
      <div className="w-screen flex justify-center px-8">
        <table className="w-full">
          <thead className="gap-3">
            <tr>
              <th className="w-32 text-start px-5">
                {sort_dir === "asc" ? (
                  <button
                    onClick={() => onFilter("code", "desc", search)}
                    className="mr-2"
                  >
                    <SortDescending size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => onFilter("code", "asc", search)}
                    className="mr-2"
                  >
                    <SortAscending size={20} />
                  </button>
                )}

                {filter === "code" ? (
                  <strong className="text-orange-400">Tomb</strong>
                ) : (
                  <span>Tomb</span>
                )}
              </th>
              <th className="w-[700px] px-5 text-start">
                {sort_dir === "asc" ? (
                  <button
                    onClick={() => onFilter("description", "desc", search)}
                    className="mr-2"
                  >
                    <SortDescending size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => onFilter("description", "asc", search)}
                    className="mr-2"
                  >
                    <SortAscending size={20} />
                  </button>
                )}

                {filter === "description" ? (
                  <strong className="text-orange-400">Descrição do item</strong>
                ) : (
                  <span>Descrição do item</span>
                )}
              </th>
              <th className="w-52 text-start px-5">Local</th>
              <th className="w-36 text-start px-5 flex flex-row justify-between items-center">
                Status
                {toggleStatus === undefined ? (
                  <button onClick={() => onChangeStatus(true)}>
                    <ToggleLeft size={24} />
                  </button>
                ) : toggleStatus === true ? (
                  <button onClick={() => onChangeStatus(false)}>
                    <ToggleRight size={24} className="text-green-300" />
                  </button>
                ) : (
                  <button onClick={() => onChangeStatus(true)}>
                    <ToggleLeft size={24} />
                  </button>
                )}
              </th>
              <th className="w-28 text-start px-5">Etiquetado</th>
              <th className="text-start px-5">Página-Linha</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr
                key={property.code}
                className={
                  index % 2 === 0
                    ? "bg-gray-700 rounded h-10 text-gray-400 font-medium"
                    : "rounded h-10 text-gray-400 font-medium"
                }
              >
                <th className="w-36 text-start px-5">{property.code}</th>
                <td className="w-[700px] px-5 text-start">
                  {property.description}
                </td>
                <td className="w-52 text-start px-5">{property.room}</td>
                <td className="w-36 text-start px-5 flex flex-row justify-start items-center">
                  {property.status ? (
                    <button
                      onClick={() => onChangeItemStatus(property.id, false)}
                    >
                      <ToggleRight size={24} className="text-green-300" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onChangeItemStatus(property.id, true)}
                    >
                      <ToggleLeft size={24} />
                    </button>
                  )}
                </td>
                <td className="w-28 text-start px-5">
                  {property.labeled ? "sim" : "não"}
                </td>
                <td className="text-start px-5">
                  {property.page}-{property.line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page_start={page_start}
        page_end={page_end}
        listedItens={properties.length}
        total={total}
        page={page}
        per_page={per_page}
        onChangePage={onChangePage}
      />
    </>
  );
}
