"use client";
export default function FilterBar({
  inputs = [],
  buttons = [],
  select = [],
  radio = [],
  checkbox = [],
  setFilter = () => {},
  filter = {},
}: FilterBarProps) {
  const [filterBase, setFilterBase] = useState({});

  return (
    <div className="bg-neutral-50 h-full p-3 rounded-md flex flex-col gap-3 m-3 shadow-xl justify-between overflow-auto flex-grow">
      <div className="flex flex-col gap-3 ">
        <h3 className=" text-primary-400 font-semibold">Pesquisar</h3>
        {inputs?.map(({ typeInput, title, placeholder }) => {
          return renderInput(title,setFilterBase, placeholder, typeInput);
        })}

        {/* {select?.map((select, index) => (
          <Select
           key={index + "FilterBarSelect"} {...select} />
        ))}
        {radio?.map((radio, index) => (
          <Radio key={index + "FilterBarRadio"} {...radio} />
        ))}
        {checkbox?.map((checkbox, index) => (
          <Checkbox key={index + "FilterBarCheckbox"} {...checkbox} />
        ))} */}
      </div>
      <Button type="primary" onClick={() => setFilter(filterBase)}>
        Filtrar
      </Button>
    </div>
  );
}

import {
  Button,
  Checkbox,
  Input,
  InputNumber,
  InputNumberProps,
  Radio,
  Select,
} from "antd";
import { FilterBarProps } from "./filterBarType";
import { ChangeEvent, useState } from "react";
import { ValueType } from "tailwindcss/types/config";
import { renderInput } from "./render/input";
