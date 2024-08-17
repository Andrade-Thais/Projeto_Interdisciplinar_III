import { DefaultSizeOptions } from "./options/DefaultSizeOptions";
import { PackOptions } from "./options/PackOptions";

export const initialData = {
  title: "",
  createdAt: new Date(),
  photosNumber: PackOptions[0].value,
  category: "",
  defaultSize: DefaultSizeOptions[0].value,
  clientAssociated: "",
};
