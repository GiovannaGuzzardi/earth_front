"use client";
import { useMetaContext } from "@/context/metadata";
import { Button, Input } from "antd";
import { useEffect } from "react";

export default function Add() {
  const listadd : { campo: string, entity: string }[] = [
    // { campo: "Dados Pessoais", entity: "person" },
    { campo: "Fazenda", entity: "farm" },
    // { campo: "Informações Pessoais do Produtor", entity: "persons" },
  ];

  return (
    <div className="p-3 bg-slate-50 flex flex-col h-full overflow-auto min-h-full">
      add
    </div>
  );
}
