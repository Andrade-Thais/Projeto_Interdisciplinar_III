import { getClientList } from "./getClientList"

export async function retrieveClientInfo(clientId) {
    try {
        const clients = await getClientList();
        const client = clients.find(client => client.id === clientId);

        if (!client) {
            console.error("Client not found...");
            return;
        }

        return {
            fullName: client.fullName,
            email: client.email
        };
    } catch (error) {
        console.error("Erro ao buscar informações do cliente...", error);
    }
}