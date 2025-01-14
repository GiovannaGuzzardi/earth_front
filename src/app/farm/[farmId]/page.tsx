"use client";
import { fieldTranslationsFarmCard } from "@/components/farm/farmutils";
import { useFarmContext } from "@/context/farm";
import { FarmType } from "@/context/farm/type";
import { Button, Input, Radio, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppContext } from "@/context";

export default function FarmDetails({
  params,
}: {
  params: { farmId: string };
}) {
  const [farm, setFarm] = useState<FarmType | null>(null);
  const { getFarmById, putFarm } = useFarmContext();
  const [optionInfo, setOptionInfo] = useState(1);
  const {apiAnt, contextHolder} = useAppContext();

  useEffect(() => {
    getFarmById(params.farmId).then((response) => {
    setFarm(response);
    });
  }, []);

  const options = [
    { label: "Geral da Fazenda", value: 1 },
    { label: "Pecuaria", value: 2 },
    { label: "Agricultura", value: 3 },
    { label: "Produtores", value: 4 },
    { label: "Fornecedor", value: 5 },
  ];

  const savePutFarm = () => {
    putFarm(farm as FarmType).then((success) => {
      if (success) {
        apiAnt.open({
          message: "Fazenda atualizada com sucesso!",
          type: "success",
        });
      } else {
        apiAnt.open({
          message: "Erro ao atualizar a fazenda!",
          type: "error",
        });
      }
    });
  };

  const router = useRouter();

  return (
    <div className="p-3 bg-slate-50 flex flex-col h-full overflow-auto min-h-full">
      <div className="border border-neutral-200 p-3 flex flex-col gap-5 rounded-md">
        <div className="flex justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Fazenda {farm?.name}</h1>
            <Tooltip title="Voltar">
              <Button
                type="link"
                size="large"
                className="w-min "
                onClick={() => {
                  router.push("/farm");
                }}
              >
                <ArrowBackIcon />
              </Button>
            </Tooltip>
          </div>
          <Radio.Group
            defaultValue={1}
            options={options}
            optionType="button"
            buttonStyle="solid"
            onChange={(e) => setOptionInfo(e.target.value)}
          />
        </div>
        <div>
          {farm && optionInfo == 1 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(farm).map(([key, value]) => (
                  <div key={key} className="grid gap-2">
                    <h1 className=" font-semibold">
                      {fieldTranslationsFarmCard[key]}
                    </h1>
                    <Input
                      placeholder={value}
                      size="large"
                      disabled={key === "id"? true : false}
                      variant="filled"
                      className=" placeholder:text-slate-950 "
                      value={farm[key as keyof FarmType]}
                      onChange={(e) => {
                        setFarm({ ...farm, [key]: e.target.value });
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <Button
                  type="primary"
                  size="large"
                  className="w-min "
                  onClick={savePutFarm}
                >
                  Salvar Alterações
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h1>Carregando...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
