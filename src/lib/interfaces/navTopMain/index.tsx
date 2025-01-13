"use client";

interface NavTopMainProps {
  title: string;
  search: boolean;
  setSearch: (search: boolean) => void;
  Component: React.FC<{
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
  }>;
}

export default function NavTopMain({
  title,
  search,
  setSearch,
  Component,
}: NavTopMainProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-neutral-50 flex w-full p-2 justify-between items-center rounded-md flex-grow-0 shadow-xl">
      <h3 className=" text-primary-400 font-semibold">Registros de {title}</h3>
      <div className="flex items-center gap-3 flex-grow justify-end">
        <Component isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Button
          type="primary"
          onClick={() => {
            !isModalOpen && setIsModalOpen(true);
          }}
        >
          Adicionar {title}
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
  );
}

import ModalFarm from "@/components/farm/modalFarm";
import { Button } from "antd";
import { useState } from "react";
