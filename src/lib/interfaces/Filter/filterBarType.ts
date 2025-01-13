"use client";
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
    select?: CustomSelectProps[];
    radio?: RadioProps[];
    checkbox?: CheckboxProps[];
    setFilter?: Dispatch<SetStateAction<{}>>;
    filter?: {};
  }
  
export interface CustomInputProps extends InputProps {
  title: string;
  typeInput?: "text" | "number"
}

export interface CustomSelectProps extends SelectProps {
  title: string;
}