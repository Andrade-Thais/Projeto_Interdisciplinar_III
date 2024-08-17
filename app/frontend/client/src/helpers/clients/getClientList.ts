import { fetchAllData } from "../../services/UserDataService";

export async function getClientList() {
  try {
    const response = await fetchAllData();
    return response.map((client) => {
      return {
        fullName: client.name + " " + client.surname,
        registryType: client.registryType,
        email: client.email,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar clientes", error);
  }
}
