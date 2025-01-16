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
import { PersonContextType, PersonPagination, PersonType } from "./type";
import { fieldTranslationsPersonCard } from "@/components/person/personutils";
import { useRouter } from "next/navigation";

const PersonContext = createContext<PersonContextType>({
    person: [] as PersonType[],
    setPerson: () => {},
    fetchPerson: async () => {},
    postPerson: async () => {},
    getPersonById: async () => ({} as PersonType),
    putPerson: async () => false,
    personPagination: {} as PersonPagination,
    deletePerson: async () =>  {},
});

export function PersonWrapper({ children }: { children: React.ReactNode }) {
    const [person, setPerson] = useState<PersonType[]>([] as PersonType[]);
    const [personPagination, setPersonPagination] = useState<PersonPagination | null>(
        {} as PersonPagination
    );
    const router = useRouter();
    async function fetchPerson(page?: number, pageSize?: number, filter?: {}) {
        try {
            if (filter) {
                const validKeys: string[] = Object.keys(fieldTranslationsPersonCard); 
                const invalidKey = Object.keys(filter).find((key) => !validKeys.includes(key));
                if (invalidKey) {
                    throw new Error(`Chave inválida no filtro de busca: ${invalidKey}`);
                }
            }
    
            const response = await api.get("/person/", {
                params: { page_size: pageSize || 10, page: page || 1 , ...filter},
            });
            setPerson(response?.data?.data);
            setPersonPagination(response?.data?.pagination);
        } catch (error) {
            setPerson([]);
            console.error("Erro ao buscar dados da API:", error);
        }
    }

    async function getPersonById(personId: string) {
        try {
            const response = await api.get(`/person/${personId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async function putPerson(newPerson: PersonType) {
        try {
            await api.put(`/person/${newPerson.id}`, newPerson);
            fetchPerson();
            return true;
        } catch (error) {
            throw error;
        }
    }

    async function postPerson(newPerson: PersonType) {
        try {
            await api.post("/person/", newPerson);
            fetchPerson();
        } catch (error) {
            throw error;
        }
    }

    async function deletePerson(personId: string) {
        try {
            await api.delete(`/person/${personId}`);
            fetchPerson();
        } catch (error) {
            throw error;
        }
    }

    return (
        <PersonContext.Provider
            value={{
                person,
                setPerson,
                fetchPerson,
                postPerson,
                getPersonById,
                putPerson,
                personPagination,
                deletePerson,
            }}
        >
            {children}
        </PersonContext.Provider>
    );
}

export function usePersonContext() {
    return useContext(PersonContext);
}