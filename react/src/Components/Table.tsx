interface PropertyInterface {
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
  term?: string;
  filter?: "description" | "code";
  page: number;
  page_start: number;
  page_end: number;
  per_page: number;
  sort_dir?: "asc" | "desc";
  total: number;
}
export function Table(props: TableProps) {
  const {
    properties,
    term = "",
    filter = "",
    page,
    page_start,
    page_end,
    sort_dir = "asc",
    total,
  } = props;
  return (
    <>
      <div className="w-screen flex justify-center px-8">
        <table className="w-full">
          <thead className="gap-3">
            <tr>
              <th className="w-36 text-start px-5">Tombamento</th>
              <th className="w-[700px] px-5 text-start">Descrição do item</th>
              <th className="w-52 text-start px-5">Local</th>
              <th className="w-36 text-start px-5">Status</th>
              <th className="w-28 text-start px-5">Etiquetado</th>
              <th className="text-start px-5">Página-Linha</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <>
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
                  <td className="w-36 text-start px-5">
                    {property.status ? "encontrado" : "não encontrado"}
                  </td>
                  <td className="w-28 text-start px-5">
                    {property.labeled ? "sim" : "não"}
                  </td>
                  <td className="text-start px-5">
                    {property.page}-{property.line}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-screen flex flex-row justify-between mt-10 px-8">
        <div>
          <span>
            Página {page_start} de {page_end} - {total} items listados
          </span>
        </div>
        <div>
          <a
            href="#"
            className="border w-5 h-5 py-2 px-3 mr-2 rounded bg-blue-500 hover:bg-blue-600"
          >
            1
          </a>
          <a
            href="#"
            className="border w-5 h-5 py-2 px-3 mr-2 rounded bg-blue-800 hover:bg-blue-600"
          >
            2
          </a>
          <a
            href="#"
            className="border w-5 h-5 py-2 px-3 mr-2 rounded bg-blue-800 hover:bg-blue-600"
          >
            3
          </a>
        </div>
      </div>
    </>
  );
}
