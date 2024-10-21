import { Dispatch, SetStateAction } from "react";

export interface StoreContextType {
  store: StoreType[];
  setStore: Dispatch<SetStateAction<StoreType[]>>; // Função para atualizar a lista
  fetchMessage: () => {}; // Função para buscar dados da API
}

export interface StoreType {
  id: number | null;
  password: string | null;
  cnpj: string | null;
  email: string | null;
  active: boolean | null;
  name: string | null;
}
