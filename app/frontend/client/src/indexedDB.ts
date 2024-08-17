
// Funções para salvar e recuperar o token de autenticação no IndexedDB
export const saveTokenToIndexedDB = (token: string, isLoggedIn: boolean) => {
  const openRequest = indexedDB.open("auth", 2); // Nome do banco de dados e versão

  // Se o banco de dados não existir, cria um novo
  openRequest.onupgradeneeded = function () {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains("tokens")) {
      db.createObjectStore("tokens");
    }
  };
  // Se o banco de dados já existir, apenas abre a conexão
  openRequest.onsuccess = function () {
    const db = openRequest.result;
    const transaction = db.transaction("tokens", "readwrite");
    const tokens = transaction.objectStore("tokens");

    const tokenRequest = tokens.put(token, "adminToken");
    const isLoggedInRequest = tokens.put(isLoggedIn, "isLoggedIn");

    tokenRequest.onsuccess = function () {
      console.log("Token salvo no IndexedDB!");
    };

    isLoggedInRequest.onsuccess = function () {
      console.log("Estado de login salvo no IndexedDB!");
    };

    tokenRequest.onerror = function () {
      console.log("Error", tokenRequest.error);
    };

    isLoggedInRequest.onerror = function () {
      console.log("Error", isLoggedInRequest.error);
    };
  };

  openRequest.onerror = function () {
    console.log("Error", openRequest.error);
  };
};

// Função para remover o token de autenticação do IndexedDB
export const removeTokenFromIndexedDB = () => {
  return new Promise<void>((resolve, reject) => {
    const openRequest = indexedDB.open("auth", 2); // Nome do banco de dados e versão

    // Se o banco de dados não existir, cria um novo
    openRequest.onupgradeneeded = function () {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains("tokens")) {
        db.createObjectStore("tokens");
      }
    };
    // Se o banco de dados já existir, apenas abre a conexão
    openRequest.onsuccess = function () {
      const db = openRequest.result;
      const transaction = db.transaction("tokens", "readwrite");
      const tokens = transaction.objectStore("tokens");

      const clearRequest = tokens.clear();

      clearRequest.onsuccess = function () {
        resolve();
      };

      clearRequest.onerror = function () {
        console.log("Error", clearRequest.error);
        reject(clearRequest.error);
      };
    };

    openRequest.onerror = function () {
      console.log("Error", openRequest.error);
    };
  });
};

// Função para recuperar o token de autenticação do IndexedDB, bem como o estado da autenticação, gerenciado pelo react
export const getAuthStateFromIndexedDB = async (): Promise<{
  adminToken: string;
  isLoggedIn: boolean;
}> => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open("auth", 2);

    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("tokens")) {
        db.createObjectStore("tokens");
      }
    };

    openRequest.onsuccess = function () {
      const db = openRequest.result;
      const transaction = db.transaction("tokens", "readonly");
      const tokens = transaction.objectStore("tokens");
      const tokenRequest = tokens.get("adminToken");
      const isLoggedInRequest = tokens.get("isLoggedIn");

      tokenRequest.onsuccess = function () {
        const adminToken = tokenRequest.result;
        isLoggedInRequest.onsuccess = function () {
          const isLoggedIn = isLoggedInRequest.result;
          resolve({ adminToken, isLoggedIn });
        };
      };

      tokenRequest.onerror = function () {
        console.log("Error", tokenRequest.error);
        reject(tokenRequest.error);
      };

      isLoggedInRequest.onerror = function () {
        console.log("Error", isLoggedInRequest.error);
        reject(isLoggedInRequest.error);
      };
    };

    openRequest.onerror = function () {
      console.log("Error", openRequest.error);
      reject(openRequest.error);
    };
  });
};
