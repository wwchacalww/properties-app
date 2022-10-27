import React, { useEffect, useState } from "react";
import { Message } from "./Components/Message";
import { Table } from "./Components/Table";
import { api } from "./Services/api";
import { outputSearchDTO } from "./Services/dtos";
import { outputSearch } from "./utils/output-search";

function App() {
  const [patrimonio, setPatrimonio] = useState<outputSearchDTO>();
  const [properties, setProperties] = useState([]);
  const [inputCode, setInputCode] = useState("");
  const [inputRoom, setInputRoom] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [search, setSearch] = useState<"room" | "description" | "">("");
  const [msg, setMsg] = useState("");
  const [toggleStatus, setToggleStatus] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    api.get<outputSearchDTO>("properties/all").then((response) => {
      setPatrimonio(response.data);
    });
    api
      .get("properties/search", {
        params: {
          term: "",
        },
      })
      .then((response) => {
        setProperties(response.data);
      });
  }, []);

  const handleChangePage = async (page: number) => {
    const status = toggleStatus;

    const output = outputSearch({
      properties,
      page,
      per_page: patrimonio?.per_page as any,
      filter: patrimonio?.filter as any,
      sort_dir: patrimonio?.sort_dir as any,
      status,
      term: patrimonio?.term,
    });
    setPatrimonio({
      page,
      filter: output.filter,
      page_end: output.page_end,
      page_start: 1,
      per_page: output.per_page,
      sort_dir: output.sort_dir,
      term: output.term,
      total: output.total,
      properties: output.items,
    });
    window.scrollTo(0, 0);
  };

  const handleFilter = async (
    filter: "code" | "description" | "room",
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
            term: patrimonio?.term,
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

  const handleSearchByRoom = async (evt: React.MouseEvent) => {
    evt.preventDefault();

    const status = toggleStatus;
    const output = outputSearch({
      properties,
      page: 1,
      per_page: patrimonio?.per_page as any,
      filter: "room",
      sort_dir: patrimonio?.sort_dir as any,
      status,
      term: inputRoom,
    });

    if (output.total > 0) {
      setPatrimonio({
        page: 1,
        filter: output.filter,
        page_end: output.page_end,
        page_start: 1,
        per_page: output.per_page,
        sort_dir: output.sort_dir,
        term: output.term,
        total: output.total,
        properties: output.items,
      });
      setMsg("");
    } else {
      console.log(output);
      setMsg("Local não encontrado");
    }

    setInputRoom("");
    setSearch("room");
  };

  const handleSearchByCode = async (evt: React.MouseEvent) => {
    evt.preventDefault();
    const status = toggleStatus;
    const output = outputSearch({
      properties,
      page: 1,
      per_page: patrimonio?.per_page as any,
      filter: "code",
      sort_dir: patrimonio?.sort_dir as any,
      status,
      term: inputCode,
    });

    if (output.total > 0) {
      setPatrimonio({
        page: 1,
        filter: output.filter,
        page_end: output.page_end,
        page_start: 1,
        per_page: output.per_page,
        sort_dir: output.sort_dir,
        term: output.term,
        total: output.total,
        properties: output.items,
      });
      setMsg("");
    } else {
      console.log(output);
      setMsg("Produto não encontrado");
    }
    setInputCode("");
    setSearch("");
  };

  const handleSearchByDescription = async (evt: React.MouseEvent) => {
    evt.preventDefault();
    const status = toggleStatus;
    const output = outputSearch({
      properties,
      page: 1,
      per_page: patrimonio?.per_page as any,
      filter: "description",
      sort_dir: patrimonio?.sort_dir as any,
      status,
      term: inputDescription,
    });

    if (output.total > 0) {
      setPatrimonio({
        page: 1,
        filter: output.filter,
        page_end: output.page_end,
        page_start: 1,
        per_page: output.per_page,
        sort_dir: output.sort_dir,
        term: output.term,
        total: output.total,
        properties: output.items,
      });
      setMsg("");
    } else {
      console.log(output);
      setMsg("Produto não encontrado");
    }
    setInputDescription("");
    setSearch("description");
  };

  const handleChangeStatus = async (status?: boolean) => {
    setToggleStatus(status);

    let filter: "description" | "code" | "room" = "code";

    switch (search) {
      case "":
        filter = "code";
        break;
      case "description":
        filter = "description";
        break;
      case "room":
        filter = "room";
        break;
      default:
        filter: "code";
        break;
    }

    const output = outputSearch({
      properties,
      page: 1,
      per_page: patrimonio?.per_page as any,
      filter,
      sort_dir: patrimonio?.sort_dir as any,
      term: patrimonio?.term,
      status,
    });

    console.log(output);

    if (output.total > 0) {
      setPatrimonio({
        page: 1,
        filter: output.filter,
        page_end: output.page_end,
        page_start: 1,
        per_page: output.per_page,
        sort_dir: output.sort_dir,
        term: output.term,
        total: output.total,
        properties: output.items,
      });
      setMsg("");
    }

    // if (inputDescription === "") {
    //   const response = await api.get<outputSearchDTO>("properties/all", {
    //     params: {
    //       filter: patrimonio?.filter,
    //       sort_dir: patrimonio?.sort_dir,
    //       per_page: patrimonio?.per_page,
    //       page: patrimonio?.page,
    //       status: toggleStatus,
    //     },
    //   });
    //   setPatrimonio(response.data);
    // } else {
    //   const response = await api.get<outputSearchDTO>(
    //     "properties/search-by-description",
    //     {
    //       params: {
    //         term: inputDescription,
    //         filter: patrimonio?.filter,
    //         sort_dir: patrimonio?.sort_dir,
    //         per_page: patrimonio?.per_page,
    //         status: toggleStatus,
    //         page: patrimonio?.page,
    //       },
    //     }
    //   );
    //   setPatrimonio(response.data);
    //   setSearch("description");
    // }

    // setSearch("description");
  };

  const handleChangeItemStatus = async (id: string, status: boolean) => {
    console.log(id);
    return status ? true : false;
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start text-gray-100">
      <header className="h-7 w-screen flex items-center justify-center py-12 border-b-4 border-b-orange-400 ">
        <h1 className="font-bold text-2xl">Controle de Patrimônio</h1>
      </header>

      <div className="py-6 grid grid-cols-3 gap-4">
        <div className="">
          <p>Busca pelo tombamento do item</p>
          <form className="flex flex-row">
            <input
              className="placeholder:italic placeholder:text-gray-300 block bg-gray-500 w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Tombamento do item..."
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button
              onClick={(evt) => handleSearchByCode(evt)}
              className="h-10 border bg-blue-500 px-3 rounded font-bold hover:bg-blue-300"
            >
              Buscar
            </button>
          </form>
        </div>

        <div className="">
          <p>Busca por descrição do item</p>
          <form className="flex flex-row">
            <input
              className="placeholder:italic placeholder:text-gray-300 block bg-gray-500 w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Descrição do item..."
              type="text"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
            />
            <button
              onClick={(evt) => handleSearchByDescription(evt)}
              className="h-10 border bg-blue-500 px-3 rounded font-bold hover:bg-blue-300"
            >
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
              onClick={(evt) => handleSearchByRoom(evt)}
              className="h-10 border bg-blue-500 px-3 rounded font-bold hover:bg-blue-300"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {msg.length > 0 ? <Message msg={msg} type="error" /> : <></>}
      {patrimonio ? (
        <Table
          search={search}
          toggleStatus={toggleStatus}
          onFilter={handleFilter}
          onChangePage={handleChangePage}
          {...patrimonio}
          onChangeStatus={handleChangeStatus}
          onChangeItemStatus={handleChangeItemStatus}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
