"use client";
import { Button, Radio, Select } from "antd";
import { use, useEffect, useState } from "react";
import "../../styles/globals.css";
import FilterBar from "@/lib/interfaces/filterbar";
import { useFarmContext } from "@/context/farm";
import { FarmType } from "@/context/farm/type";
import {
  fieldTranslationsFarmCard,
  orderedKeysFarmCard,
} from "../../components/farm/farmutils";
import ModalFarm from "@/components/farm/modalFarm";
import { useRouter } from "next/navigation";
import { range } from "@/lib/utils";
import { Placeholder } from "phosphor-react";

export default function farm() {
  const [search, setSearch] = useState(false);
  const { fetchFarm, farm, farmPagination } = useFarmContext();
  const [size, setSize] = useState<number>(5);
  const [position, setPosition] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const pageFarm = range(farmPagination?.total_offset);
  const inputs: { title: string; placeholder: string; typeInput?: "text" | "number" }[] = [
    { title: "name", placeholder: "Nome" },
    {title: "id", placeholder: "Identificador"},
    {title: "area", placeholder: "Área" , typeInput: "number"},
  ];

  const router = useRouter();

  useEffect(() => {
    fetchFarm();
  }, []);

  useEffect(() => {
    fetchFarm(position, size, filter);
  }, [size, position,filter]);

  return (
    <div className="flex h-full w-full">
      {search && (
        <div className="p-3 pr-0 w-1/4 h-full">
          <FilterBar inputs={inputs} setFilter={setFilter} filter={filter} />
        </div>
      )}
      <div className="h-full w-full p-3 flex flex-col gap-3 ">
        <div className="bg-neutral-50 flex w-full p-2 justify-between items-center rounded-md flex-grow-0 shadow-xl">
          <h3 className=" text-primary-400 font-semibold">
            Fazendas Cadastradas
          </h3>
          <div className="flex items-center gap-3 flex-grow justify-end">
            <ModalFarm />
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
          {farm.length > 0 ? (
            farm?.map((value, index) => {
              return (
                <div
                  key={value?.id || "n/a" + index}
                  className="h-fit w-full rounded-md shadow-xl bg-neutral-50 flex items-center rounded-l-full round "
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg"
                    alt="placeholder"
                    className="h-full max-w-[8%] aspect-square rounded-l-full  flex-grow-0 mr-4 object-cover"
                  />
                  <div className="grid grid-cols-[repeat(4,_minmax(0,_25%))] items-start justify-start h-full flex-grow gap-3 p-3">
                    {farm.length > 0 ? (
                      orderedKeysFarmCard.map((key) => (
                        <div key={key} className="flex flex-col w-full">
                          <div className="text-sm break-words opacity-90 font-semibold">
                            {fieldTranslationsFarmCard[key]}
                          </div>
                          <div className="text-base break-words">
                            {farm[index][key as keyof FarmType] !== undefined
                              ? farm[index][key as keyof FarmType]
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
                      onClick={() => {
                        router.push(`/farm/${value.id}`);
                      }}
                    >
                      Saber Mais
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        window.open(value.location_link, "_blank");
                      }}
                    >
                      Mapeamento
                    </Button>
                    <Button type="primary" danger>
                      Excluir
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center">
              Ainda não foram encontradas fazendas...
            </div>
          )}
        </div>
        <div className="bg-neutral-50 flex w-full px-3 py-2 justify-between items-center rounded-md flex-grow-0 shadow-xl">
          <p className="flex-grow-0">
            <b className="mr-1 font-semibold text-sm">Total:</b>
            {farmPagination?.total_count}
          </p>
          <div className="flex items-center gap-3 flex-grow justify-end">
            <p className="flex-grow-0 font-semibold text-sm ">Pagina:</p>
            <Radio.Group
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              {pageFarm.map((value, index) => (
                <Radio.Button key={index} value={value}>
                  {value}
                </Radio.Button>
              ))}
            </Radio.Group>
            <p className="flex-grow-0  text-sm font-semibold ">Quantidade:</p>
            <Select
              value={size}
              onChange={(value) => setSize(value)}
              options={[
                { value: 1, label: "1" },
                { value: 10, label: "10" },
                { value: 15, label: "15" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
