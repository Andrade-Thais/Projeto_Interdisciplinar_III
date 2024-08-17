export interface RevenueDataProps {
  StepOne: {
    registryType: string;
    installments?: number;
    title: string;
    value: string;
    dueDate: string;
    isPaid: boolean;
  };
  StepTwo: {
    accountType: string;
    categoryType: string;
    client: string;
  };
  StepThree: {
    paymentMethod: string;
    detailedDescription: string;
    automaticPayment: boolean;
   
  };
}
