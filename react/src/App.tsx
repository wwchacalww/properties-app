import React, { useEffect, useState } from "react";
import { Table } from "./Components/Table";
import { api } from "./Services/api";
import { outputSearchDTO } from "./Services/dtos";

function App() {
  const [patrimonio, setPatrimonio] = useState<outputSearchDTO>();
  const [inputRoom, setInputRoom] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [search, setSearch] = useState<"room" | "description" | "">("");

  useEffect(() => {
    api.get<outputSearchDTO>("properties/all").then((response) => {
      setPatrimonio(response.data);
    });
  }, []);

  const handleChangePage = async (page: number) => {
    const response = await api.get<outputSearchDTO>("properties/all", {
      params: {
        filter: patrimonio?.filter,
        sort_dir: patrimonio?.sort_dir,
        per_page: patrimonio?.per_page,
        page,
      },
    });
    setPatrimonio(response.data);
    window.scrollTo(0, 0);
  };

  const handleFilter = async (
    filter: "code" | "description",
    sort_dir: "asc" | "desc",
    search: "room" | "description" | ""
  ) => {
    if (search === "") {
      const response = await api.get<outputSearchDTO>("properties/all", {
        params: {
          filter,
          sort_dir,
          per_page: patrimonio?.per_page,
          page: patrimonio?.page,
        },
      });
      setPatrimonio(response.data);
    }

    if (search === "description") {
      const response = await api.get<outputSearchDTO>(
        "properties/search-by-description",
        {
          params: {
            filter,
            sort_dir,
            per_page: patrimonio?.per_page,
            page: patrimonio?.page,
          },
        }
      );
      setPatrimonio(response.data);
    } else {
      const response = await api.get<outputSearchDTO>(
        "properties/list-by-room",
        {
          params: {
            term: patrimonio?.term,
            filter,
            sort_dir,
            per_page: patrimonio?.per_page,
            page: patrimonio?.page,
          },
        }
      );
      setPatrimonio(response.data);
    }
  };

  const handleSearchByCode = async (evt: React.MouseEvent) => {
    evt.preventDefault();

    const response = await api.get<outputSearchDTO>("properties/list-by-room", {
      params: {
        term: inputRoom,
        filter: patrimonio?.filter,
        sort_dir: patrimonio?.sort_dir,
        per_page: patrimonio?.per_page,
        page: patrimonio?.page,
      },
    });

    setPatrimonio(response.data);
    setInputRoom("");
    setSearch("room");
  };

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
              value={inputRoom}
              onChange={(e) => setInputRoom(e.target.value)}
            />
            <button
              onClick={(evt) => handleSearchByCode(evt)}
              className="h-10 border bg-blue-500 px-3 rounded font-bold hover:bg-blue-300"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
      {patrimonio ? (
        <Table
          search={search}
          onFilter={handleFilter}
          onChangePage={handleChangePage}
          {...patrimonio}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
