"use client";
import { FarmType } from "@/context/farm/type";
import {
  CheckboxProps,
  InputProps,
  RadioProps,
  SelectProps,
} from "antd";
import { Dispatch, SetStateAction } from "react";

export interface FilterBarProps {
    inputs?: CustomInputProps[];
    buttons?: [];
    select?: SelectProps[];
    radio?: RadioProps[];
    checkbox?: CheckboxProps[];
    setFilter?: Dispatch<SetStateAction<{}>>;
    filter?: {};
  }
  
export interface CustomInputProps extends InputProps {
  title: string;
  typeInput?: "text" | "number"
}