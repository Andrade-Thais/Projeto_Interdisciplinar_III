export interface UserDataProps {
  stepOne: {
    registryType: string;
    personType: string;
    name: string;
    surname?: string;
    email: string;
    phone: string;
    birthDate: string;
    cpf: string;
  };
  stepTwo: {
    zip: string;
    street: string;
    streetNumber: number;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  stepThree: {
    receiveSMS: boolean;
    receiveEmail: boolean;
  };
}