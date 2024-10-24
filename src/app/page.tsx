"use client";
import Image from "next/image";
import "../styles/globals.css";
import { useAppContext } from "@/context";
import {Brasil} from "../../public/img/brasil";
import { useStoreContext } from "@/context/store";
import { use, useEffect } from "react";

export default function Home() {
  return (
    <>
      <div className=" container flex-grow items-center justify-center text-center content-center bg-slate-300 self-center">
        <h1 className="text-center text-5xl font-bold">Bem Vindo a Earth</h1>
        <div className="flex items-center justify-center">
          <Brasil width={300} height={300} />
        </div>
      </div>
    </>
  );
}