import { fieldTranslationsFarmCard } from "@/app/farm/farmutils";
import { FarmType } from "@/context/farm/type";
import { Button, Input, Modal } from "antd";
import { useState } from "react";

type Field = {
  name: keyof FarmType;
  type?: string;
  required?: boolean;
  value: string;
  alert?: string;
};

const initialFields: Field[] = [
  { name: "id", type: "text", required: false, value: "" , alert: ""},
  { name: "name", type: "text", required: true, value: "", alert: "" },
  { name: "state", type: "text", required: true, value: "" , alert: ""},
  { name: "city", type: "text", required: true, value: ""  , alert: ""},
  { name: "area", type: "number", required: true, value: ""  , alert: ""},
  { name: "longitude", type: "number", required: true, value: "" , alert: ""},
  { name: "latitude", type: "number", required: true, value: "" , alert: ""},
  { name: "average_altitude", type: "number", required: false, value: "" , alert: ""},
  { name: "registration", type: "text", required: false, value: "" , alert: ""},
  { name: "record_car", type: "text", required: false, value: "" , alert: ""},
  { name: "record_incra", type: "text", required: false, value: "" , alert: ""},
  { name: "district", type: "text", required: false, value: "" , alert: ""},
  { name: "subdistrict", type: "text", required: false, value: ""   , alert: ""},
  { name: "generator_power", type: "number", required: false, value: "" , alert: ""},
  { name: "wagon_capacity", type: "number", required: false, value: "" , alert: ""},
  { name: "tank_capacity", type: "number", required: false, value: "" , alert: ""},
];

export default function ModalFarm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Field[]>(initialFields);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevData) =>
      prevData.map((field) =>
        field.name === name ? { ...field, value: value } : field
      )
    );
  };
  const handleAddFarm = () => {
    console.log(formValues);
    // closeModal();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Adicionar Fazenda
      </Button>
      <Modal
        title="Criar nova fazenda"
        open={isModalOpen}
        width={1000}
        footer={null}
        onCancel={closeModal}
      >
        <form
          className="grid grid-cols-2 gap-2"
          onSubmit={(e) => {
            e.preventDefault(); // Previne o comportamento padrão de recarregar a página
            handleAddFarm(); // Chama a função para adicionar a fazenda
          }}
        >
          {formValues.map((field, index) => (
            <Input
              key={field.name}
              name={field.name}
              value={formValues[index].value}
              onChange={handleChange}
              size="large"
              placeholder={fieldTranslationsFarmCard[field.name]}
              type={field.type}
              required={field.required}
            />
          ))}
          <div className="col-span-2 text-right flex space-x-2 mt-2">
            <Button key="submit" type="primary" htmlType="submit" size="large">
              Adicionar fazenda
            </Button>
            <Button
              key="cancel"
              type="primary"
              danger
              onClick={closeModal}
              size="large"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
