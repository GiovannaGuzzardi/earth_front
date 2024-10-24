"use client";
import { useAppContext } from "@/context";
import { Alert, Input, Button } from "antd";
import Link from "antd/es/typography/Link";
import { FormEvent, useEffect, useState } from "react";
import { FacebookLogo, GoogleLogo } from "phosphor-react";
import { BrasilText } from "../../../public/img/brasil_text";

export default function login() {
  const { setAuth, fetchAuth, auth } = useAppContext();
  const [message, setError] = useState<string>("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (document.getElementById("email_log") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("password_log") as HTMLInputElement
    ).value;

    setAuth({
      username: email,
      password: password,
    });
  };

  useEffect(() => {
    if (auth?.username && auth?.password) {
      fetchAuth().then((result) => {
        if (!result.success) {
          setError(result.message);
        }
      });
      setAuth(null);
    }
  }, [auth]);

  return (
    <div className="flex flex-wrap-reverse h-[100%] justify-between px-[3vw] py-[3vh] overflow-auto bg-gradient-to-l from-primary-300 to-white ">
      <div className="w-1/2 h-full flex-grow-0  ">
        <BrasilText width={"85%"} height={"100%"} />
      </div>
      <div className="flex flex-col flex-grow justify-between bg-slate-50 mr-2- p-[2.5rem] rounded-md items-center max-w-[25rem] self-center w-2/5 mr-[2rem]">
        <button
          // onClick={signInWithGoogle}
          className="bg-blue-700 text-white font-bold ease-in hover:bg-blue-800 rounded-md py-[0.5rem] px-[0.8rem] m-[0.5rem] flex w-full"
        >
          <GoogleLogo size={24} color="#ffffff" weight="fill" />
          <h3 className="ml-[1rem]">Entrar com o google</h3>
        </button>
        <button
          // onClick={signInWithFacebook}
          className="bg-blue-500 text-white font-bold ease-in hover:bg-blue-600 rounded-md py-[0.5rem] px-[0.8rem] m-[0.5rem] flex w-full"
        >
          <FacebookLogo size={24} color="#ffffff" weight="fill" />
          <h3 className="ml-[1rem]">Entrar com o facebook</h3>
        </button>
        <h1 className="font-bold  text-center my-7 text-xl">
          Ou, entre com seu e-mail
        </h1>
        {message && (
          <Alert
            message={message}
            className="mb-4 w-[-webkit-fill-available]"
            type="error"
            showIcon
          />
        )}
        <form
          onSubmit={onSubmit}
          className="flex flex-col flex-grow justify-cente w-full "
        >
          <Input
            type="email"
            placeholder="Insira o seu e-mail "
            required={true}
            size="large"
            id="email_log"
            className="mb-3"
          />
          <Input.Password
            type="password"
            required={true}
            placeholder="Insira a sua senha"
            size="large"
            id="password_log"
            className="mb-3"
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="mb-3"
          >
            Entrar
          </Button>
        </form>
        <div className="flex flex-col my-2">
          <Link
            href=""
            className=" text-center text-black hover:text-primary-400"
          >
            Esqueceu sua senha?
          </Link>
          <Link
            href=""
            className=" text-center text-black hover:text-primary-400 "
          >
            Ainda não é cadastrado? realize seu registro
          </Link>
        </div>
      </div>
    </div>
  );
}
