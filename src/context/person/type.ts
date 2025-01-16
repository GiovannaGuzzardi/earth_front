import { Dispatch, SetStateAction } from "react";

export interface PersonContextType {
    person: PersonType[];
    setPerson: Dispatch<SetStateAction<PersonType[]>>;
    fetchPerson: (page?: number, pageSize?: number, filter?:{}) => Promise<void>;
    postPerson: (newPerson: PersonType) => Promise<void>;
    getPersonById: (personId: string) => Promise<PersonType>;
    putPerson: (newPerson: PersonType) => Promise<boolean>;
    personPagination: PersonPagination | null;
    deletePerson: (personId: string) => Promise<void>;
}

export interface PersonType {
    id?: string;
    name?: string;
    cpf?: string;
    cnpj?: number;
    email?: string;
    nickname?: string;
    rg?: string;
    city?: string;
    state?: string;
    birth_date?: string;
    cell_phone?: string;
    legal_person?: boolean;
    observation?: string;
    type?: "usuario_comum" | "produtor"  
}

export interface PersonPagination {
    total_count: number;
    count: number;
    offset: number;
    total_offset: number;
}