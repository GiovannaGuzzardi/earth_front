"use client";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

export default function login() {
  const router = useRouter();
  const {setLogin} = useAppContext();

  const handleClick = () => {
    setLogin(true); // Atualiza o estado
    router.push('/'); // Redireciona para a página desejada
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4 content-center justify-self-center">
      <h1 className="m-4 text-2xl font-bold ">Iniciar Sessão</h1>
      <div className="grid grid-flow-row gap-4 items-center sm:w-1/3">
        <input
          type="text"
          placeholder="Insira o seu e-mail "
          className=" border-2 p-3 rounded-sm"
        />
        <input
          type="text"
          placeholder="Insira o seu e-mail "
          className=" border-2 p-3 rounded"
        />
        <button className="bg-primary-400 p-3 rounded text-white"
        onClick={handleClick}
        >Entrar</button>
        <a href="" className=" text-center text-black hover:text-primary-400">esqueceu sua senha?</a>
      </div>
    </div>
  );
}
