import { Button, Input } from "antd";

export default function FilterBar({inputs = [] , buttons = []}) {
  return (
    <div className="bg-neutral-50 w-1/4 p-3 rounded-md flex flex-col gap-3 m-3 mr-0 shadow-xl justify-between overflow-auto">
      <div className="flex flex-col gap-3">
        <Input placeholder="Nome" />
        <Input placeholder="Estado" />
        <Input placeholder="Cidade" />
        <Input placeholder="Area" />
      </div>
      <Button type="primary">Filtrar</Button>
    </div>
  );
}
