"use client";

import { useEffect, useState } from "react";
import logo_text from "../../../public/img/logo_text.svg";
import Image from "next/image";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAppContext } from "@/context";
import { log } from "console";
import { useRouter } from "next/navigation";

export function Layout() {
  const [selected, setSelected] = useState(true);
  const [options, setOptions] = useState([
    { name: "", link: "/" },
  ]);
  const router = useRouter();
  const {login, setLogin} = useAppContext();

  useEffect(() => {
    if (login) {
      setOptions([
        { name: "Página Inicial", link: "/" },
        { name: "Vender", link: "/sobre" },
        { name: "Resgatar", link: "/contato" },
      ]);
    } else {
      setOptions([
        { name: "Página Inicial", link: "/" },
        { name: "Entrar", link: "/login" },
      ]);
    }
  }, [login]);

  const handleClick = () => {
    setLogin(false); // Atualiza o estado
    router.push('/login'); // Redireciona para a página desejada
  };

  return (
    <nav className="w-full flex justify-between items-center bg-opacity-90 bg-primary-400 border-b-2 border-primary-200">
      <a className="flex-grow-0 ml-3" href="/">
        <Image
          src={logo_text}
          alt={""}
          className="h-16 w-min hover:opacity-50"
        />
      </a>
      <div className="flex space-x-4 flex-grow items-center justify-end">
        <div className="grid gap-4 grid-flow-col">
          {options.map((option) => (
            <div className="mx-4" key={option.name}>
              <a
                href={`${option.link}`}
                className="font-bold text-xl text-slate-50  hover:text-slate-300"
              >
                {option.name}
              </a>
            </div>
          ))}
          {login && (
            <div className="mr-6">
              <button
                className="font-bold text-xl text-slate-50  hover:text-slate-300"
                onClick={handleClick}
              >
                <ExitToAppIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
