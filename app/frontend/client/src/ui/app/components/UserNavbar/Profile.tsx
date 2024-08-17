import { Avatar, Dropdown } from "flowbite-react";
import { useUserType } from "../../../../contexts/auth/UserRoleContext";
import { AuthContext } from "../../../../contexts/auth/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const isAdminLoggedIn = useUserType().userType === "admin";
  const isUserLoggedIn = useUserType().userType === "user";
  const isLoggedIn = isAdminLoggedIn || isUserLoggedIn;
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };
  return (
    <>
      {isAdminLoggedIn ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar className="mr-2" alt="Configurações do usuário" rounded />
          }
        >
          <Dropdown.Header>
            <Dropdown.Item className="block text-sm" href="/app">
              Adriana Oliveira
            </Dropdown.Item>
            <span className="block truncate text-sm font-medium"></span>
          </Dropdown.Header>
          <Dropdown.Item href="/app/clientes">
            Gerenciamento de Clientes
          </Dropdown.Item>
          <Dropdown.Item href="/app/galerias">
            Gerenciamento de Galerias
          </Dropdown.Item>
          <Dropdown.Item href="/app/financeiro">
            Gerenciamento de Finanças
          </Dropdown.Item>
          <Dropdown.Item href="/app/agenda">
            Gerenciamento de Compromissos
          </Dropdown.Item>
          <Dropdown.Divider />
          {isLoggedIn && (
            <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
          )}
        </Dropdown>
      ) : isUserLoggedIn ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar className="mr-2" alt="Configurações do usuário" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Nome do cliente</span>
            <span className="block truncate text-sm font-medium">
              cliente@example.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item href="/app/escolher-fotos">
            Escolher Fotos
          </Dropdown.Item>
          <Dropdown.Item href="/app/visualizar-contratos">
            Visualizar Contratos
          </Dropdown.Item>
          <Dropdown.Item href="/app/ajuda">Ajuda</Dropdown.Item>
          <Dropdown.Divider />
        </Dropdown>
      ) : null}
    </>
  );
}
