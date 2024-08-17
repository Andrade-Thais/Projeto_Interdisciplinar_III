const API = "http://localhost:8000/app";

const handleErrors = async (response) => {
  if (!response.ok) {
    let errorMessage;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.detail;
    } catch (e) {
      console.error('Erro ao converter mensagem de erro', e);
    }
    throw Error(errorMessage);
  }
  return response;
};

export const fetchData = async (id: string) => {
  const response = await fetch(`${API}/consultar-cliente?id=${id}`);
  await handleErrors(response); 
  const data = await response.json();
  return data;
};

export const fetchAllData = async () => {
  const response = await fetch(`${API}/consultar-clientes`);
  await handleErrors(response);
  const data = await response.json();
  return data;
}

export const sendData = async (id?: string, data) => {
  const url = id ? `${API}/editar-cliente/${id}` : `${API}/novo-cliente`;
  const method = id ? "PUT" : "POST";
  
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  await handleErrors(response);
  return response.json();
};