"use client";
import {
  Button,
  Checkbox,
  Input,
  Radio,
  Select,
} from "antd";
import { FilterBarProps } from "./filterBarType";

export default function FilterBar({
  inputs = [],
  buttons = [],
  select = [],
  radio = [],
  checkbox = [],
  
}: FilterBarProps) {
  return (
    <div className="bg-neutral-50 h-full p-3 rounded-md flex flex-col gap-3 m-3 shadow-xl justify-between overflow-auto flex-grow">
      <div className="flex flex-col gap-3 ">
        <h3 className=" text-primary-400 font-semibold">Pesquisar</h3>
        {inputs?.map((input, index) => (
          <Input
            key={index + "FilterBarInput"}
            placeholder={input.placeholder}
            {...input}
          />
        ))}
        {select?.map((select, index) => (
          <Select key={index + "FilterBarSelect"} {...select} />
        ))}
        {radio?.map((radio, index) => (
          <Radio key={index + "FilterBarRadio"} {...radio} />
        ))}
        {checkbox?.map((checkbox, index) => (
          <Checkbox key={index + "FilterBarCheckbox"} {...checkbox} />
        ))}
      </div>
      <Button type="primary">Filtrar</Button>
    </div>
  );
}
