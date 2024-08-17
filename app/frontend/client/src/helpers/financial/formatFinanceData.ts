export const formatFinanceData = (data) => {
    Array.from(data).map((item) => {
        item.dueDate = new Date(item.dueDate).toLocaleDateString();
        item.dueDate.split("/").reverse().join("-");
        item.value = parseFloat(item.value).toFixed(2).replace(".", ",");
        return item;
    });
}