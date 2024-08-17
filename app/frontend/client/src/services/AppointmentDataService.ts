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
  const response = await fetch(`${API}/consultar-compromisso?id=${id}`);
  await handleErrors(response);
  const data = await response.json();
  return data;
};

export const fetchAllData = async () => {
  const response = await fetch(`${API}/listar-eventos`);
  await handleErrors(response);
  const data = await response.json();
  return data;
};

export const sendData = async (data) => {
  const url = `${API}/criar-evento`;
  const method = "POST";

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

export const deleteData = async (id: string) => {
  const response = await fetch(`${API}/deletar-evento/${id}`, {
    method: "DELETE",
  });

  await handleErrors(response);
  return response.json();
};
