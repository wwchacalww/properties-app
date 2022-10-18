import { useEffect, useState } from "react";
import { Table } from "./Components/Table";
import { api } from "./Services/api";
import { outputSearchDTO, PropertyEntity } from "./Services/dtos";

const properties = [
  {
    code: "00000.237.868",
    description:
      "Retroprojetor de Transparencia, 110/220 Volts, M/tes, Mod. 9815 Abg",
    room: "Sala da Bete",
    status: true,
    labeled: false,
    page: 1,
    line: 3,
  },
  {
    code: "00000.335.792",
    description:
      "Cadeira, marca Caderode, modelo 811, fixa estofada em espuma, revestida em courvim, estrutura em aço.",
    room: "Secretaria",
    status: true,
    labeled: true,
    page: 3,
    line: 14,
  },
  {
    code: "00000.642.012",
    description:
      "Equipamento de armazenagem CTC com 06 gavetas, em aço, medindo 120x100x65cm.",
    room: "sem sala",
    status: false,
    labeled: false,
    page: 8,
    line: 3,
  },
];

function App() {
  const [patrimonio, setPatrimonio] = useState<outputSearchDTO>();
  useEffect(() => {
    api.get<outputSearchDTO>("properties/all").then((response) => {
      setPatrimonio(response.data);
    });
  }, []);
  console.log(patrimonio);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start text-gray-100">
      <header className="h-7 w-screen flex items-center justify-center py-12 border-b-4 border-b-orange-400 ">
        <h1 className="font-bold text-2xl">Controle de Patrimônio</h1>
      </header>

      <div className="py-6 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <p>Busca por descrição do item</p>
          <form className="flex flex-row">
            <input
              className="placeholder:italic placeholder:text-gray-300 block bg-gray-500 w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Descrição do item..."
              type="text"
              name="search"
            />
            <button className="h-10 border bg-blue-500 px-3 rounded font-bold hover:bg-blue-300">
              Buscar
            </button>
          </form>
        </div>

        <div className="">
          <p>Busca por local do item</p>
          <form className="flex flex-row">
            <input
              className="placeholder:italic placeholder:text-gray-300 block bg-gray-500 w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Informe o local..."
              type="text"
              name="search"
            />
            <button className="h-10 border bg-blue-500 px-3 rounded font-bold hover:bg-blue-300">
              Buscar
            </button>
          </form>
        </div>
      </div>
      {patrimonio ? <Table {...patrimonio} /> : <></>}
    </div>
  );
}

export default App;
