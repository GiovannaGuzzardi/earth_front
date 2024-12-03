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
import { FarmContextType, FarmType } from "./type";

const FarmContext = createContext<FarmContextType>({
  farm: [] as FarmType[],
  setFarm: () => {},
  fetchFarm: async () => {},
  postFarm: async () => {},
});

export function FarmWrapper({ children }: { children: React.ReactNode }) {
  const [farm, setFarm] = useState<FarmType[]>([] as FarmType[]);

  async function fetchFarm() {
    try {
      const response = await api.get("/farm/");
      setFarm(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }

  async function postFarm(newFarm: FarmType) {
    try {
      await api.post("/farm/", newFarm);
      fetchFarm();
    } catch (error) {
      throw error;
    }
  }

  return (
    <FarmContext.Provider value={{ farm, setFarm, fetchFarm, postFarm }}>
      {children}
    </FarmContext.Provider>
  );
}

export function useFarmContext() {
  return useContext(FarmContext);
}
