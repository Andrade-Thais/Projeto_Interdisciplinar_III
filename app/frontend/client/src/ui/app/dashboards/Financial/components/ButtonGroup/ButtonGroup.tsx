import { Button } from "flowbite-react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function ButtonGroup() {
  return (
    <div className="w-10/12 my-12 flex lg:flex-nowrap xxs:flex-wrap mx-auto justify-between">
      <Button
        className="lg:w-1/6 py-4 mx-auto font-bold bg-error"
        href="/app/nova-despesa"
      >
        <FaMinus className="text-xl mr-2" />
        Nova Despesa
      </Button>
      <Button
        className="lg:w-1/6  py-4 mx-auto font-bold bg-success"
        href="/app/nova-receita"
      >
        <FaPlus className="text-xl mr-2" />
        Nova Receita
      </Button>
    </div>
  );
}
