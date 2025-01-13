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
import { FarmContextType, FarmPagination, FarmType } from "./type";
import { fieldTranslationsFarmCard } from "@/components/farm/farmutils";

const FarmContext = createContext<FarmContextType>({
  farm: [] as FarmType[],
  setFarm: () => {},
  fetchFarm: async () => {},
  postFarm: async () => {},
  getFarmById: async () => ({} as FarmType),
  putFarm: async () => {},
  farmPagination: {} as FarmPagination,
});

export function FarmWrapper({ children }: { children: React.ReactNode }) {
  const [farm, setFarm] = useState<FarmType[]>([] as FarmType[]);
  const [farmPagination, setFarmPagination] = useState<FarmPagination | null>(
    {} as FarmPagination
  );
  async function fetchFarm(page?: number, pageSize?: number, filter?: {}) {
    try {
      if (filter) {
        // Lista das chaves válidas em FarmType
        const validKeys: string[] = Object.keys(fieldTranslationsFarmCard); 
  
        // Verifica se todas as chaves do filtro são válidas dentro de FarmType
        const filteredKeys = Object.keys(filter).every((key) => {
          return validKeys.includes(key); // Verifica se a chave existe em validKeys
        });
        // console.log(filter);
        if (!filteredKeys) {
          throw new Error(`Chave inválida no filtro de busca:${filter}`);
        }
      }
  
      const response = await api.get("/farm/", {
        params: { page_size: pageSize || 10, page: page || 1 , ...filter},
      });
      setFarm(response?.data?.data);
      setFarmPagination(response?.data?.pagination);
    } catch (error) {
      setFarm([]);
      console.error("Erro ao buscar dados da API:", error);
    }
  }

  async function getFarmById(farmId: string) {
    try {
      const response = await api.get(`/farm/${farmId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function putFarm(newFarm: FarmType) {
    try {
      await api.put(`/farm/${newFarm.id}`, newFarm);
      fetchFarm();
    } catch (error) {
      throw error;
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
    <FarmContext.Provider
      value={{
        farm,
        setFarm,
        fetchFarm,
        postFarm,
        getFarmById,
        putFarm,
        farmPagination,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}

export function useFarmContext() {
  return useContext(FarmContext);
}
