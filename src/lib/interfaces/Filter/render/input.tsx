import { Input, InputNumber } from "antd";
import { Dispatch, SetStateAction } from "react";
import { ValueType } from "tailwindcss/types/config";

export const renderInput = (
    title: string,
    setFilterBase: Dispatch<SetStateAction<{}>>,
    placeholder?: string,
    typeInput?: string,
  ) => {
    return typeInput === "number" ? (
      <InputNumber
        key={`filter-number-${title}`}
        onChange={(value: ValueType | null) => handleChange(title,setFilterBase,undefined, value)}
        placeholder={placeholder}
        style={{ width: "100%" }}
      />
    ) : (
      <Input
        key={`filter-text-${title}`}
        placeholder={title}
        onChange={(e) => handleChange(title,setFilterBase,e.target.value, null)}
      />
    );
    
  };
  
const handleChange = (title: string,setFilterBase: Dispatch<SetStateAction<{}>>,value?: string, value2?: ValueType | null) => {
    setFilterBase((prev) => {
      const updatedValue = value ?? value2 ?? null;
      return {
        ...prev,
        [title]: updatedValue,
      };
    });
};