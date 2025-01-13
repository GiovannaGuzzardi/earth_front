"use client";

interface ModalFarmProps {isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void}

export default function ModalFarm({ isModalOpen, setIsModalOpen }: ModalFarmProps) {
  // Estado do modal e valores do formulário
  const [farmValues, setFormValues] = useState<FarmType>(valorDefault);
  const [form] = Form.useForm();
  const { postFarm } = useFarmContext();
  const { apiAnt } = useAppContext();

  // Funções para abrir e fechar o modal
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle para submeter os dados
  const handleAddFarm = (values: FarmType) => {
    postFarm(values)
      .then(() => {
        handlecancel(); // Reseta campos e fecha modal
        apiAnt.open({
          message: `Fazenda ${values.name} adicionada com sucesso`,
          type: "success",
          duration: 4,
          showProgress: true,
          pauseOnHover: true,
        });
      })
      .catch((error: any) => {
        apiAnt.open({
          message: "Erro ao adicionar fazenda",
          description: error?.response?.data?.detail || "Algo deu errado",
          type: "error",
          duration: 4,
          showProgress: true,
          pauseOnHover: true,
        });
      });
  };

  // Função para cancelar a operação
  const handlecancel = () => {
    form.resetFields(); // Reseta campos do formulário
    setFormValues(valorDefault); // Reseta valores ao padrão
    form.setFieldsValue(valorDefault); // Reaplica valores padrão explicitamente
    closeModal(); // Fecha modal
  };

  // Renderização do componente
  return (
      <Modal
        title="Criar nova fazenda"
        open={isModalOpen}
        width={"80vw"}
        footer={null}
        onCancel={closeModal}
      >
        <Form
          form={form} // Vincula o form à instância criada
          layout="vertical"
          className="grid grid-cols-3 gap-x-3"
          initialValues={farmValues} // Define valores iniciais
          onFinish={handleAddFarm}
          onValuesChange={(changedValues, allValues) => {
            setFormValues(allValues); // Atualiza o estado com os valores mais recentes
          }}
        >
          {initialFields.map((field) => (
            <Form.Item
              key={field.name}
              label={fieldTranslationsFarmCard[field.name]}
              tooltip={field.alert}
              name={field.name}
              rules={[
                { type: field.type },
                { required: field.required, message: "Campo obrigatório" },
              ]}
              style={{ marginBottom: 1 }}
            >
              {field.typeInput === "select" ? (
                <Select>
                  {field.options?.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              ) : field.type === "number" ? (
                <InputNumber />
              ) : (
                <Input />
              )}
            </Form.Item>
          ))}
          <div className="col-span-2 text-right flex space-x-2 mt-2">
            <Button key="submit" type="primary" htmlType="submit" size="large">
              Adicionar fazenda
            </Button>
            <Button type="primary" danger onClick={handlecancel} size="large">
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal>
  );
}

import { fieldTranslationsFarmCard } from "@/components/farm/farmutils";
import { FarmType } from "@/context/farm/type";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { use, useState } from "react";
import { Field, initialFields, valorDefault } from "./configFarm";
import { useFarmContext } from "@/context/farm";
import { useAppContext } from "@/context";
import React from "react";