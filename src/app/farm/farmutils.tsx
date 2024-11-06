import { FarmType } from "@/context/farm/type";

export const fieldTranslationsFarmCard: { [key: string]: string } = {
    id: "Identificador",
    name: "Nome",
    state: "Estado",
    city: "Cidade",
    area: "Área",
    longitude: "Longitude",
    latitude: "Latitude",
    average_altitude: "Altitude Média",
    registration: "Registro",
    record_car: "Registro CAR",
    record_incra: "Registro INCRA",
    district: "Distrito",
    subdistrict: "Subdistrito",
    generator_power: "Potência do Gerador",
    wagon_capacity: "Capacidade do vagão",
    tank_capacity: "Capacidade do tanque",
  };

  // Ordem desejada das chaves para exibição
export  const orderedKeysFarmCard: (keyof FarmType)[] = [
    "id",
    "name",
    "state",
    "city",
    "area",
    "longitude",
    "latitude",
    "average_altitude",
    
  ];

