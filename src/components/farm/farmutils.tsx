import { FarmType } from "@/context/farm/type";
import { FilterBarProps } from "@/lib/interfaces/Filter/filterBarType";

export const fieldTranslationsFarmCard: { [key: string]: string } = {
    id: "Identificador",
    name: "Nome",
    state: "Estado",
    city: "Cidade",
    area: "Área",
    longitude: "Longitude",
    latitude: "Latitude",
    location_link: "Link de Localização",
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

export const filterOptions: FilterBarProps = {
    select: [
      {
        placeholder: "Estado",
        title: "state",
        options: [
          { value: "MG", label: "Minas Gerais" },
          { value: "SP", label: "São Paulo" },
          { value: "", label: "Limpar" },
        ],
      },
      {
        placeholder: "Cidade",
        title: "city",
        options: [
          { value: "uberlandia", label: "Uberlândia" },
          { value: "Ribeirão Preto", label: "Ribeirão Preto" },
          { value: "", label: "Limpar" },
        ],
      },
    ],
    inputs: [
      { title: "name", placeholder: "Nome" },
      { title: "id", placeholder: "Identificador" },
      { title: "area", placeholder: "Área", typeInput: "number" },
    ],
  };
