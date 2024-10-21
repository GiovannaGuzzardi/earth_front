"use client";
import { useAppContext } from "@/context";
import { Alert, Input, Button } from "antd";
import Link from "antd/es/typography/Link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import brasil from "../../../public/img/brasil.svg";

export default function login() {
  const router = useRouter();
  const { setAuth, fetchAuth, auth, contextHolder } = useAppContext();
  const [message, setError] = useState<string>("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (document.getElementById("email_log") as HTMLInputElement).value;
    const password = (document.getElementById("password_log") as HTMLInputElement).value;

    setAuth({
      username: email,
      password: password,
    });
  };

  useEffect(() => {
    if (auth.username && auth.password) {
      fetchAuth().then((result) => {
        if (!result.success) {
          setError(result.message);
        }
      });
    }
  }, [auth]);

  return (
    <div className="flex flex-row items-center flex-grow p-4 justify-evenly bg-slate-200 ">
      <div className="flex flex-col flex-grow-0 justify-center bg-slate-50 p-4 rounded-md items-center">
        <h1 className="font-bold  text-center m-4 text-lg">Seja Bem Vindo, Realize seu login</h1>
        {message && <Alert message={message} className="mb-4 min-w-max" type="error" showIcon />}
        <form onSubmit={onSubmit} className="grid grid-flow-row gap-4 items-center">
          <Input
            type="email"
            placeholder="Insira o seu e-mail "
            required={true}
            size="large"
            id="email_log"
            className="min-w-80"
          />
          <Input.Password
            type="password"
            required={true}
            placeholder="Insira a sua senha"
            size="large"
            id="password_log"
          />
          <Button type="primary" htmlType="submit" size="large">
            Entrar
          </Button>
        </form>
    <div className="flex flex-col my-2">
    <Link href="" className=" text-center text-black hover:text-primary-400">
          esqueceu sua senha?
        </Link>
        <Link href="" className=" text-center text-black hover:text-primary-400 ">
        Ainda não é cadastrado? realize seu registro
        </Link>
    </div>
        <h2 className="text-lg ">Ou entre com</h2>
        <div className="grid gap-2 grid-flow-col grid-cols-3 my-2">
           <div className=" rounded-full bg-slate-600 w-2 h-2 p-5 "></div>
           <div className=" rounded-full bg-slate-600 w-2 h-2 p-5 "></div>
           <div className=" rounded-full bg-slate-600 w-2 h-2 p-5 "></div>
        </div>
      </div>
      <div className="flex items-center justify-center h-auto w-auto">
        <Image
          src={brasil}
          alt="Brasil"
          style={{ height: "auto", width: "100%", maxWidth: "35rem" }}
        />
      </div>
    </div>
  );
}
