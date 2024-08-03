"use client"
import Image from "next/image";
import "../styles/globals.css";
import { useAppContext } from "@/context";

export default function Home() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  // var a = 1;

  // interface User {
  //   id: number;
  //   name: string;
  //   email: string;
  //   phone: string;
  // }

  const {login, setLogin} = useAppContext();
  // const users = (await res.json()) as User[];
  return (
    <>
      <div className=" container">
        <h1>{login}</h1>
        {/* <ul>
          {users.map((user) => (
            <li key={user?.id}>
              <h2>{user?.name}</h2>
            </li>
          ))}
        </ul> */}
        <a href="/contato">contatos</a>
      </div>
    </>
  );
}
