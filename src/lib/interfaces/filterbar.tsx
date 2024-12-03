"use client"; 
  import { Button, Checkbox, CheckboxProps, Input, InputProps, Radio, RadioProps, Select, SelectProps } from "antd";


  interface FilterBarProps {
    inputs?: InputProps[];
    buttons?: [];
    select?: SelectProps[];
    radio?: RadioProps[];
    checkbox?: CheckboxProps[];
  }

  export default function FilterBar({inputs = [], buttons = [], select = [], radio = [], checkbox = []}: FilterBarProps) {
    return (
      <div className="bg-neutral-50 h-full p-3 rounded-md flex flex-col gap-3 m-3 shadow-xl justify-between overflow-auto flex-grow">
        <div className="flex flex-col gap-3">
          {inputs?.map((input, index) => (
            <Input key={index + "FilterBarInput"} placeholder={input.placeholder} {...input} />
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
