"use client";
interface getComponentProps {
  value: any;
  id: string | undefined;
  index: number;
  orderedKeysCard: string[];
  fieldTranslationsCard: { [key: string]: string };
  entity: { [key: string]: any }[];
  title: string;
  funcDelete: (id: string) => void;
}

export default function GetComponent({
  value,
  id,
  index,
  orderedKeysCard,
  fieldTranslationsCard,
  entity,
  title,
  funcDelete,
}: getComponentProps) {
  const router = useRouter();

  return (
    <div
      key={id || index + "get_component"}
      className="h-fit w-full rounded-md shadow-xl bg-neutral-50 flex items-center rounded-l-full round "
    >
      <img
        src="https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg"
        alt="placeholder"
        className="h-full max-w-[8%] aspect-square rounded-l-full  flex-grow-0 mr-4 object-cover"
      />
      <div className="grid grid-cols-[repeat(4,_minmax(0,_25%))] items-start justify-start h-full flex-grow gap-3 p-3">
        {entity.length > 0 ? (
          orderedKeysCard.map((key) => (
            <div key={key + "aaa"} className="flex flex-col w-full">
              <div className="text-sm break-words opacity-90 font-semibold">
                {fieldTranslationsCard[key]}
              </div>
              <div className="text-base break-words">
                {entity[index][key] !== undefined ? entity[index][key] : "N/A"}
              </div>
            </div>
          ))
        ) : (
          <div>Dados não disponíveis</div>
        )}
      </div>
      <div className="grid justify-between grid-cols-1 h-full flex-grow-0 gap-3 p-3 min-w-[10%]">
        <Button
          type="primary"
          className="!bg-primary-800 !border-primary-800 !text-white hover:!bg-primary-800 hover:!border-primary-800 hover:opacity-80"
          onClick={() => {
            router.push(`/${title}/${value.id}`);
          }}
        >
          Saber Mais
        </Button>
        <Button
          type="primary"
          onClick={() => {
            window.open(value.location_link, "_blank");
          }}
        >
          Mapeamento
        </Button>
        <Button type="primary" danger onClick={() => { funcDelete(value.id); }  }>
          Excluir
        </Button>
      </div>
    </div>
  );
}

import { Button } from "antd";
import { useRouter } from "next/navigation";
