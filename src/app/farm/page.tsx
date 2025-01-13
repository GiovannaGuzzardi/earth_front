"use client";
export default function farm() {
  const [search, setSearch] = useState(false);
  const { fetchFarm, farm, farmPagination } = useFarmContext();
  const [size, setSize] = useState<number>(5);
  const [position, setPosition] = useState<number>(1);
  const [filter, setFilter] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetchFarm();
  }, []);

  useEffect(() => {
    fetchFarm(position, size, filter);
  }, [size, position, filter]);

  return (
    <div className="flex h-full w-full">
      {search && (
        <div className="p-3 pr-0 w-1/4 h-full">
          <FilterBar
            inputs={filterOptions.inputs}
            setFilter={setFilter}
            filter={filter}
            select={filterOptions.select}
          />
        </div>
      )}
      <div className="h-full w-full p-3 flex flex-col gap-3 ">
        <NavTopMain
          title="Fazenda"
          search={search}
          setSearch={setSearch}
          Component={ModalFarm}
        />
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
        <NavButtonMain
          position={position}
          setPosition={setPosition}
          size={size}
          setSize={setSize}
        />
      </div>
    </div>
  );
}

import { Button } from "antd";
import { useEffect, useState } from "react";
import "../../styles/globals.css";
import FilterBar from "@/lib/interfaces/Filter/filterbar";
import { useFarmContext } from "@/context/farm";
import { FarmType } from "@/context/farm/type";
import {
  fieldTranslationsFarmCard,
  filterOptions,
  orderedKeysFarmCard,
} from "../../components/farm/farmutils";
import ModalFarm from "@/components/farm/modalFarm";
import { useRouter } from "next/navigation";
import { range } from "@/lib/util/utils";
import NavTopMain from "@/lib/interfaces/navTopMain";
import { FilterBarProps } from "@/lib/interfaces/Filter/filterBarType";
import NavButtonMain from "@/lib/interfaces/navButtonMain";
