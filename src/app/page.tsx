"use client";
import Image from "next/image";
import "../styles/globals.css";
import { useAppContext } from "@/context";
import logo from "../../public/img/logo_text.svg";
import { useStoreContext } from "@/context/store";
import { use, useEffect } from "react";

export default function Home() {
  return (
    <>
      <div className=" container flex-grow items-center justify-center text-center content-center bg-slate-300 self-center">
        <h1 className="text-center text-5xl font-bold">Bem Vindo a Earth</h1>
        <div className="flex items-center justify-center">
          <Image
            src={logo}
            alt={""}
            className=" h-24 w-min hover:opacity-50"
            color=""
          />
        </div>
      </div>
    </>
  );
}

// {store.map((store) => (
//   <div key={store?.id} className="flex flex-col items-center justify-center">
//     <h2>{store?.name}</h2>
//   </div>
// ))}

// useEffect(() => {
//   fetchMessage();
// }, []);

// const { store, fetchMessage } = useStoreContext();
