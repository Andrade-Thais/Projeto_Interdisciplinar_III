import { Button, TextInput } from "flowbite-react";

export default function Searchbar() {
  return (
    <div className="flex my-4 justify-center mx-auto">
      <TextInput
        type="search"
        placeholder="Pesquise uma galeria por título..."
        className="w-8/12"
      />
      <Button className="bg-secondary" type="button">
        Pesquisar
      </Button>
    </div>
  );
}
