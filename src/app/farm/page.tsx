"use client";
import { Alert, Input, Button, Radio, Select } from "antd";
import { useState } from "react";
import "../../styles/globals.css";
import { Filter } from "@mui/icons-material";
import FilterBar from "@/lib/interfaces/filterbar";
export default function farm() {
  const a = [
    {
      src: "https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg",
      id: "CRM-1012",
      nome: "Ipê dos Solares",
      estado: "mg",
      cidade: "uberlândia",
      aréa: "20,000",
    }
  ];

  const [position, setPosition] = useState<"start" | "end">("end");
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const [search, setSearch] = useState(false)


  return (
    <div className="flex h-full w-full">
    {search && <FilterBar />} 
    <div className="h-full w-full p-3 flex flex-col gap-3 ">
      <div className="bg-neutral-50 flex w-full p-2 justify-between items-center rounded-md flex-grow-0 shadow-xl">
        <h3 className=" text-primary-400">Fazendas Cadastradas</h3>
        <div className="flex items-center gap-3 flex-grow justify-end">
        <Button type="primary">Adicionar Fazenda</Button>
        <Button type="primary" onClick={()=>{search ? setSearch(false) : setSearch(true)}}>Filtrar</Button>
        </div>
      </div>
      <div className="bg-neutral-50 w-auto  rounded-md p-3 flex flex-col items-start justify-start gap-3 flex-grow overflow-auto shadow-xl">
        {a.map((value, index) => {
          return (
            <div
              key={value.id + index}
              className="h-fit w-full rounded-md shadow-xl bg-neutral-50 flex items-center rounded-l-full round "
            >
              <img
                src={value.src}
                alt="placeholder"
                className="h-full max-w-[8%] aspect-square rounded-l-full  flex-grow-0 mr-4 object-cover"
              />
              <div className="grid grid-cols-[repeat(4,_minmax(0,_25%))] items-start justify-start h-full flex-grow gap-3 p-3">
                {Object.entries(value).map(([key, value], index) =>
                  key !== "src" ? (
                    <div key={key + index} className="flex flex-col w-full">
                      <div className="text-sm break-words opacity-80">
                        {key}
                      </div>
                      <div className="text-base font-bold break-words">
                        {value}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
              <div className="grid justify-between grid-cols-1 h-full flex-grow-0 gap-3 p-3 min-w-[10%]">
                <Button type="primary" className="!bg-primary-800 !border-primary-800 !text-white hover:!bg-primary-800 hover:!border-primary-800 hover:opacity-80">
                  Saber Mais
                </Button>
                <Button type="primary">
                  Mapeamento
                </Button>
                <Button type="primary" danger>
                  Excluir
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-neutral-50 flex w-full p-3 justify-between items-center rounded-md flex-grow-0 shadow-xl">
        <p className="flex-grow-0">
          Total: <b>53</b>
        </p>
        <div className="flex items-center gap-3 flex-grow justify-end">
          <p className="flex-grow-0">Pagina:</p>
          <Radio.Group
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <Radio.Button value="1">1</Radio.Button>
            <Radio.Button value="2">2</Radio.Button>
            <Radio.Button value="3">3</Radio.Button>
          </Radio.Group>
          <Select
            placeholder="Itens por Pagina:"
            onChange={handleChange}
            className=""
            options={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
              { value: "15", label: "15" },
            ]}
          />
        </div>
      </div>
    </div>
    </div>
  );
}
