"use client";
import api from "@/api";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthType, TokenType, AppContextType, FetchAuthResult } from "./type";
import { notification } from "antd";
import { useRouter } from "next/navigation";

const AppContext = createContext<AppContextType>({
  auth: {} as AuthType,
  setAuth: () => {},
  token: null,
  setToken: () => {},
  fetchAuth: async () => ({ success: false, message: "Função não implementada." }),
  logout: async () => {},
  contextHolder: <></>,
});
export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [auth, setAuth] = useState<AuthType | null>({} as AuthType);
  let [token, setToken] = useState<TokenType | null>(null);
  const [apiAnt, contextHolder] = notification.useNotification();
  const [error, setError] = useState<{} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  async function fetchAuth(): Promise<FetchAuthResult> {
    try {
      const params = new URLSearchParams();
      if (!auth) {
        return { success: false, message: "Usuário não autenticado" };
      }
      params.append("username", auth.username);
      params.append("password", auth.password);

      const response = await api.post("/auth/token", params.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = response.data;
      console.log("Token recebido:", data);
      sessionStorage.setItem("authToken", JSON.stringify(data));
      setToken(data); // Atualizando o estado com o token recebido
      router.push("/resgatar"); // Redirecionando para a página inicial após o login
      setTimeout(() => {
        apiAnt.open({
          message: "Bem vindo à Earth Brasil!",
          description: "Usuário logado com sucesso!",
          duration: 4,
          showProgress: true,
          pauseOnHover: true,
        });
      }, 100);

      return { success: true, message: "Usuario logado com sucesso!" };
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: "Erro" + error.response.status + ": " + error.response.data.detail };
      } else {
        return { success: false, message: `Erro desconhecido${error}`};
      }
    }
  }

  // Função para remover o token
  async function logout() {
    setToken(null); // Atualizar o estado
    sessionStorage.removeItem("authToken");
    router.push("/login");
    apiAnt.open({
      message: "Você saiu do sistema!",
      description: "Usuario deslogado com sucesso",
      duration: 4,
      showProgress: true,
      pauseOnHover: true,
    });
  }

  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth,
        token,
        setToken,
        fetchAuth,
        logout,
        contextHolder,
      }}
    >
      {contextHolder}
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
