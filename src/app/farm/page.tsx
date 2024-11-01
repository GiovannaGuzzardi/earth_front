"use client";
import { Alert, Input, Button, Radio, Select } from "antd";
import { use, useEffect, useState } from "react";
import "../../styles/globals.css";
import { Filter } from "@mui/icons-material";
import FilterBar from "@/lib/interfaces/filterbar";
import { useRouter } from "next/navigation";
import { useFarmContext } from "@/context/farm";
import { FarmType } from "@/context/farm/type";

export default function farm() {
  const [position, setPosition] = useState<"start" | "end">("end");
  const [search, setSearch] = useState(false);
  const { fetchFarm, farm } = useFarmContext();
  const router = useRouter();

  const inputs = [
    { placeholder: "Nome" },
    { placeholder: "Estado" },
    { placeholder: "Cidade" },
  ];

  useEffect(() => {
    fetchFarm();
  }, []);

  

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // Mapeamento das chaves com traduções para exibição
  const fieldTranslations: { [key: string]: string } = {
    id: "ID",
    name: "Nome",
    state: "Estado",
    city: "Cidade",
    area: "Área",
    longitude: "Longitude",
    latitude: "Latitude",
    average_altitude: "Altitude Média",
    // Adicione mais traduções conforme necessário
  };
  // Ordem desejada das chaves para exibição
  const orderedKeys: (keyof FarmType)[] = [
    "id",
    "name",
    "state",
    "city",
    "area",
    "longitude",
    "latitude",
    "average_altitude",
    // ... outras chaves que você quer usar
  ];

  return (
    <div className="flex h-full w-full">
      {search && <FilterBar inputs={inputs} />}
      <div className="h-full w-full p-3 flex flex-col gap-3 ">
        <div className="bg-neutral-50 flex w-full p-2 justify-between items-center rounded-md flex-grow-0 shadow-xl">
          <h3 className=" text-primary-400">Fazendas Cadastradas</h3>
          <div className="flex items-center gap-3 flex-grow justify-end">
            <Button
              type="primary"
              onClick={() => {
                router.push("/farm/register");
              }}
            >
              Adicionar Fazenda
            </Button>
            <Button
              type="primary"
              onClick={() => {
                search ? setSearch(false) : setSearch(true);
              }}
            >
              Filtrar
            </Button>
          </div>
        </div>
        <div className="bg-neutral-50 w-auto  rounded-md p-3 flex flex-col items-start justify-start gap-3 flex-grow overflow-auto shadow-xl">
          {farm.map((value, index) => {
            return (
              <div
                key={value.id + index}
                className="h-fit w-full rounded-md shadow-xl bg-neutral-50 flex items-center rounded-l-full round "
              >
                <img
                  src="https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg"
                  alt="placeholder"
                  className="h-full max-w-[8%] aspect-square rounded-l-full  flex-grow-0 mr-4 object-cover"
                />
                <div className="grid grid-cols-[repeat(4,_minmax(0,_25%))] items-start justify-start h-full flex-grow gap-3 p-3">
                  {farm.length > 0 ? (
                    orderedKeys.map((key) => (
                      <div key={key} className="flex flex-col w-full">
                        <div className="text-sm break-words opacity-80">
                          {fieldTranslations[key]}
                        </div>
                        <div className="text-base font-bold break-words">
                          {farm[0][key as keyof FarmType] !== undefined
                            ? farm[0][key as keyof FarmType]
                            : "N/A"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>Dados não disponíveis</div>
                  )}
                </div>
                <div className="grid justify-between grid-cols-1 h-full flex-grow-0 gap-3 p-3 min-w-[10%]">
                  <Button
                    type="primary"
                    className="!bg-primary-800 !border-primary-800 !text-white hover:!bg-primary-800 hover:!border-primary-800 hover:opacity-80"
                  >
                    Saber Mais
                  </Button>
                  <Button type="primary">Mapeamento</Button>
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
