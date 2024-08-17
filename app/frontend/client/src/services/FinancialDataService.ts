const API = "http://localhost:8000/app";

const handleErrors = async (response) => {
  if (!response.ok) {
    let errorMessage;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.detail;
    } catch (e) {
      console.error("Erro ao converter mensagem de erro", e);
    }
    throw Error(errorMessage);
  }
  return response;
};

export const fetchData = async (id: string) => {
  const response = await fetch(`${API}/consultar-registro?id=${id}`);
  await handleErrors(response);
  const data = await response.json();
  return data;
};

export const deleteData = async (id: string) => {
  const response = await fetch(`${API}/excluir-registro/${id}`, {
    method: "DELETE",
  });
  await handleErrors(response);
  return response.json();
};

export const fetchAllData = async () => {
  const response = await fetch(`${API}/consultar-registros`);
  await handleErrors(response);
  const data = await response.json();
  return data;
};

export const sendData = async (id?: string, data) => {
  const url = id ? `${API}/editar-registro/${id}` : `${API}/novo-registro`;
  const method = id ? "PUT" : "POST";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await handleErrors(response);
  return response.json();
};
