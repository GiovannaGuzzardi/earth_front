"use client";
export default function Farm() {
  const [search, setSearch] = useState(false);
  const { fetchFarm, farm , deleteFarm} = useFarmContext();
  const [size, setSize] = useState<number>(5);
  const [position, setPosition] = useState<number>(1);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    fetchFarm(position, size, filter);
  }, [size, position, filter]);

  return (
    <div className="flex h-full w-full">
      {search && (
        <FilterBar
          inputs={filterOptions.inputs}
          setFilter={setFilter}
          filter={filter}
          select={filterOptions.select}
        />
      )}
      <div className="h-full w-full p-3 flex flex-col gap-3 ">
        <NavTopMain
          title="Fazenda"
          search={search}
          setSearch={setSearch}
          Component={ModalFarm}
          inicialFieldsPass={initialFields}
        />
        <div className="bg-neutral-50 w-auto  rounded-md p-3 flex flex-col items-start justify-start gap-3 flex-grow overflow-auto shadow-xl">
          {farm.length > 0 ? (
            farm?.map((value, index) => {
              return (
                <GetComponent
                  id={value?.id}
                  value={value}
                  index={index}
                  orderedKeysCard={orderedKeysFarmCard}
                  fieldTranslationsCard={fieldTranslationsFarmCard}
                  entity={farm}
                  title="farm"
                  funcDelete={deleteFarm}
                />
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

import { useEffect, useState } from "react";
import "../../styles/globals.css";
import FilterBar from "@/lib/interfaces/Filter/filterbar";
import { useFarmContext } from "@/context/farm";
import {
  fieldTranslationsFarmCard,
  filterOptions,
  orderedKeysFarmCard,
} from "../../components/farm/farmutils";
import ModalFarm from "@/components/farm/modalFarm";
import { useRouter } from "next/navigation";
import NavTopMain from "@/lib/interfaces/navTopMain";
import NavButtonMain from "@/lib/interfaces/navButtonMain";
import GetComponent from "@/components/getComponent";import { initialFields } from "@/components/farm/configFarm";

