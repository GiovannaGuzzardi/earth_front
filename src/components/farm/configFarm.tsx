import { FarmType } from "@/context/farm/type";

export type Field = {
  name: keyof FarmType;
  type?: "string" | "number" | "boolean" | "url" | "email";
  typeInput?: "text" | "number" | "email" | "password" | "select";
  required?: boolean;
  value: string | number | null;
  alert?: string;
  options?: string[];
};

export const initialFields: Field[] = [
  { name: "id", type: "string", required: false, value: null, alert: "" },
  { name: "name", type: "string", required: true, value: null, alert: "" },
  {
    name: "state",
    type: "string",
    typeInput: "select",
    required: true,
    value: null,
    alert: "",
    options: [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
  },
  {
    name: "city",
    type: "string",
    typeInput: "select",
    required: true,
    value: null,
    alert: "",
    options: [
      "São Paulo",
      "Rio de Janeiro",
      "Belo Horizonte",
      "Curitiba",
      "Brasília",
      "Salvador",
      "Fortaleza",
      "Recife",
      "Porto Alegre",
      "Manaus",
      "Belém",
      "Goiânia",
      "São Luís",
      "Maceió",
      "Campo Grande",
      "Natal",
      "Teresina",
      "João Pessoa",
      "Aracaju",
      "Cuiabá",
      "Palmas",
      "Boa Vista",
      "Macapá",
      "Rio Branco",
    ],
  },
  { name: "area", type: "number", required: true, value: null, alert: "" },
  { name: "longitude", type: "number", required: true, value: null, alert: "" },
  { name: "latitude", type: "number", required: true, value: null, alert: "" },
  {
    name: "location_link",
    type: "url",
    required: true,
    value: null,
    alert: "",
  },
  {
    name: "average_altitude",
    type: "number",
    required: true,
    value: null,
    alert: "",
  },
  {
    name: "registration",
    type: "string",
    required: false,
    value: null,
    alert: "",
  },
  {
    name: "record_car",
    type: "string",
    required: true,
    value: null,
    alert: "",
  },
  {
    name: "record_incra",
    type: "string",
    required: false,
    value: null,
    alert: "",
  },
  { name: "district", type: "string", required: false, value: null, alert: "" },
  {
    name: "subdistrict",
    type: "string",
    required: false,
    value: null,
    alert: "",
  },
  {
    name: "generator_power",
    type: "number",
    required: false,
    value: null,
    alert: "",
  },
  {
    name: "wagon_capacity",
    type: "number",
    required: false,
    value: null,
    alert: "",
  },
  {
    name: "tank_capacity",
    type: "number",
    required: false,
    value: null,
    alert: "",
  },
];

// Gera valores padrão a partir de initialFields
export const valorDefault: FarmType = initialFields.reduce((acc, field) => {
  (acc as Record<string, any>)[field.name] = field.value; // Ajusta o tipo dinamicamente
  return acc;
}, {} as FarmType);
