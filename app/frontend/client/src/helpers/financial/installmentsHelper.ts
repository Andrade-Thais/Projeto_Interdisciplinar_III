export const installmentsHelper = (numOfInstallments, value) => {
    //Preço
    const pricing = value / numOfInstallments;
    const formattedPricing = pricing.toFixed(2);

    return formattedPricing;
}