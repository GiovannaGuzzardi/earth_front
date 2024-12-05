import { Dispatch, SetStateAction } from "react";

export interface FarmContextType {
    farm: FarmType[];
    setFarm: Dispatch<SetStateAction<FarmType[]>>;
    fetchFarm: () => Promise<void>;
    postFarm: (newFarm: FarmType) => Promise<void>;
    getFarmById: (farmId: string) => Promise<FarmType>;
  }

export interface FarmType {
    id: string;
    name: string;
    longitude: number;
    latitude: number;
    location_link: string;
    area: number;
    average_altitude: number;
    registration: string;
    record_car: string;
    record_incra: string;
    state: string;
    city: string;
    district: string;
    subdistrict: string;
    generator_power: number;
    wagon_capacity: number;
    tank_capacity: number;
  }