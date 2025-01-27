"use client";
import { useContext, useState } from "react";
import { createContext } from "react";
import api from "@/api";

export interface MetaContextType {
   meta: MetaType[]; 
   fetchMeta: (title: string) => Promise<MetaType[] | null>;
}

export interface MetaType {
    id: string;
    name: string;
    description: string;
    type: string;
    required: boolean;
    pt_br: string;
    table: string;
}

const MetaContext = createContext<MetaContextType>({
    meta: [] as MetaType[],
    fetchMeta: async () => [] as MetaType[],
});

export function MetaWrapper({ children }: { children: React.ReactNode }) {
    const [meta, setMeta] = useState<MetaType[]>([] as MetaType[]);
    async function fetchMeta(table: string) {
        try {
            const response = await api.get(`/metadata/${table}`);
            setMeta(response?.data);
            return response?.data;
        } catch (error) {
            setMeta([]);
            console.error("Erro ao buscar dados da API:", error);
            return null;
        }
    }

    return (
        <MetaContext.Provider
            value={{
                meta,
                fetchMeta,
            }}
        >
            {children}
        </MetaContext.Provider>
    );
}

export function useMetaContext() {
    return useContext(MetaContext);
}