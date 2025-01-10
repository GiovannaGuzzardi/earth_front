"use client";
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
import { useState } from "react";

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

  const handleFilter = () => {
    setFilter(filterBase);
  };

  return (
    <div className="bg-neutral-50 h-full p-3 rounded-md flex flex-col gap-3 m-3 shadow-xl justify-between overflow-auto flex-grow">
      <div className="flex flex-col gap-3 ">
        <h3 className=" text-primary-400 font-semibold">Pesquisar</h3>
        {inputs?.map((input, index) => (
          <>
            {input.typeInput === "number" ? (
              <InputNumber
                key={index + "FilterBarInputNumber"}
                onChange={(e) =>
                  setFilterBase((prev) => ({
                    ...prev,
                    [input.title]: e, // Atualiza o valor do campo atual
                  }))
                }
                placeholder={input.placeholder}
                style={{ width: "100% " }}
              />
            ) : (
              <Input
                key={index + "FilterBarInput"}
                placeholder={input.title}
                onChange={(e) => {
                  setFilterBase((prev) => ({
                    ...prev,
                    [input.title]: e.target.value, // Atualiza o valor do campo atual
                  }));
                }}
              />
            )}
          </>
        ))}

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
      <Button type="primary" onClick={handleFilter}>
        Filtrar
      </Button>
    </div>
  );
}
