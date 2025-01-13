interface NavButtonMainProps {
    position: number;
    setPosition: Dispatch<SetStateAction<number>>
    size: number;
    setSize: Dispatch<SetStateAction<number>>;
}

export default function NavButtonMain ({position, setPosition, size, setSize}: NavButtonMainProps) {
    const {farmPagination } = useFarmContext();
    const pageFarm = range(farmPagination?.total_offset);
    return (
        <div className="bg-neutral-50 flex w-full px-3 py-2 justify-between items-center rounded-md flex-grow-0 shadow-xl">
          <p className="flex-grow-0">
            <b className="mr-1 font-semibold text-sm">Total:</b>
            {farmPagination?.total_count}
          </p>
          <div className="flex items-center gap-3 flex-grow justify-end">
            <p className="flex-grow-0 font-semibold text-sm ">Pagina:</p>
            <Radio.Group
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              {pageFarm.map((value, index) => (
                <Radio.Button key={index} value={value}>
                  {value}
                </Radio.Button>
              ))}
            </Radio.Group>
            <p className="flex-grow-0  text-sm font-semibold ">Quantidade:</p>
            <Select
              value={size}
              onChange={(value) => setSize(value)}
              options={[
                { value: 1, label: "1" },
                { value: 10, label: "10" },
                { value: 15, label: "15" },
              ]}
            />
          </div>
        </div>
    )
}

import { useFarmContext } from "@/context/farm";
import { range } from "@/lib/util/utils";
import { Radio, Select } from "antd";
import { Dispatch, SetStateAction } from "react";