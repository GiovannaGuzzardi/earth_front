"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import logo_text from "../../../public/img/brasil_text_branco.svg";
import Image from "next/image";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

export function Layout() {
  interface NavButton {
    onclick: () => void | undefined;
    icon: JSX.Element;
  }

  const base = [
    { name: "Página Inicial", link: "/" },
    { name: "Entrar", link: "/login" },
    { name: "Cadastrar", link: "/cadastro" },
  ];

  const [options, setOptions] = useState(base);
  const router = useRouter();
  const { token, logout } = useAppContext();

  useEffect(() => {
    if (token) {
      setOptions([
        { name: "Fazendas", link: "/farm" },
        { name: "Produtores", link: "/grower" },
        { name: "Fornecedores", link: "/supplier" },
        { name: "Transporte", link: "/transport" },
      ]);
    } else {
      setOptions(base);
    }
  }, [token]);

  const handleClick = () => {
    logout();
    router.push("/login"); // Redireciona para a página desejada
  };

  const navbuttons: NavButton[] = [
    { onclick: ()=>{ router.push("/settings") }, icon: <SettingsIcon /> },
    { onclick: handleClick , icon: <ExitToAppIcon /> },
  ];

  return (
    <nav className="w-full flex flex-grow-0 justify-between items-center bg-opacity-90 bg-primary-400 border-b-2 border-primary-300">
      <a className="flex-grow-0 ml-3" href="/">
        <Image
          src={logo_text}
          alt={""}
          className="h-16 w-min hover:opacity-50"
        />
      </a>
      <div className="flex space-x-4 flex-grow items-center justify-end">
        <div className="grid gap-4 grid-flow-col mr-4">
          {options.map((option) => (
            <div className="space-x-5" key={option.name}>
              <a
                href={`${option.link}`}
                className="font-bold text-lg text-slate-50  hover:text-slate-300"
              >
                {option.name}
              </a>
            </div>
          ))}
          {token && (
            <div className="flex space-x-5">
              {navbuttons.map((element, index) => (
                <button
                  className="font-bold text-xl text-slate-50  hover:text-slate-300 flex items-center"
                  onClick={element.onclick}
                  key={index + "navbutton"}
                >
                  {element.icon}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
