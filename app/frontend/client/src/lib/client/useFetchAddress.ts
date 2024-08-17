import { useEffect } from "react";

type SetValueFunction = (
  name: string,
  value: unknown,
  options?: Partial<{ shouldValidate: boolean; shouldDirty: boolean }>
) => void;

const useFetchAddress = (zipCode: string, setValue: SetValueFunction) => {
  useEffect(() => {
    const refactoredZipCode =
      zipCode && zipCode.replace("-", "").replace(" ", "");
    if (refactoredZipCode && refactoredZipCode.length === 8) {
      fetch(`https://viacep.com.br/ws/${refactoredZipCode}/json/`)
        .then((response) => response.json())
        .then((data) => {
          setValue("street", data.logradouro);
          setValue("city", data.localidade);
          setValue("state", data.uf);
          setValue("neighborhood", data.bairro);
        })
        .catch((error) => console.error(error));
    }
  }, [zipCode, setValue]);
};

export default useFetchAddress;
