"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { StoreContextType, StoreType } from "./type";
import api from "@/api";

const StoreContext = createContext<StoreContextType>({
  store: [] as StoreType[],
  setStore: () => {},
  fetchMessage: async () => {},
});

export function StoreWrapper({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<StoreType[]>([] as StoreType[]);

  async function fetchMessage() {
    try {
      const response = await api.get("/store/");
      setStore(response.data);
      console.log("storee atualizado:", store);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }

  return (
    <StoreContext.Provider value={{ store, setStore, fetchMessage }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(StoreContext);
}
