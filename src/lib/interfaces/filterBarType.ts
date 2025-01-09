"use client";
import {
  CheckboxProps,
  InputProps,
  RadioProps,
  SelectProps,
} from "antd";

export interface FilterBarProps {
    inputs?: InputProps[];
    buttons?: [];
    select?: SelectProps[];
    radio?: RadioProps[];
    checkbox?: CheckboxProps[];
  }