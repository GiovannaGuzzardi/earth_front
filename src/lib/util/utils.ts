import { Dispatch, SetStateAction } from "react";
import { ValueType } from "tailwindcss/types/config";

export const range = (n : number | undefined) => Array.from({ length: n ? n : 0 }, (_, i) => i + 1);

export const handleChange = (title: string,setFilterBase: Dispatch<SetStateAction<{}>>,value?: string, value2?: ValueType | null) => {
    setFilterBase((prev) => {
      const updatedValue = value ?? value2 ?? null;
      return {
        ...prev,
        [title]: updatedValue,
      };
    });
};