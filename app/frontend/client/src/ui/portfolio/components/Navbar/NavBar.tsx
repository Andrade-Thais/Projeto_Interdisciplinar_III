import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "../../../../components/Shared/Image/Image";
import { useFetch } from "../../../../hooks/useFetch";

export default function NavBar({ handleLogout, userType, actions }) {
  const data = useFetch("../../../../../db.json");
  const navData = data && data.navbar;
  const logo = navData && navData[0];
  const links = navData && Array.from(navData).map((item) => item.href);
  const texts = navData && Array.from(navData).map((item) => item.title);

  return (
    <>
      <Navbar fluid className="bg-primary">
        <Navbar.Brand href="#">
          <Image
            src={logo && logo.src}
            className="ml-3"
            alt="Logo"
            width="100"
            height="100"
          />
        </Navbar.Brand>
        <div className="flex mr-2 md:order-2">
          {userType === "admin" ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  className="mr-2"
                  alt="Configurações do usuário"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Adriana Oliveira</span>
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
              <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
            </Dropdown>
          ) : userType === "user" ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar className="mr-2" alt="Opções do usuário" rounded />
              }
            >
              <Dropdown.Item href={actions && actions.enterGallery}>
                Escolher Fotos
              </Dropdown.Item>

              <Dropdown.Divider />
            </Dropdown>
          ) : null}
          <Navbar.Toggle className="bg-primary focus:bg-primary active:bg-primary border-none active:border-none" />
        </div>
        <Navbar.Collapse>
          {links &&
            links.map((link, index) => (
              <Navbar.Link
                href={link}
                className="font-medium text-[15px] text-center text-white flex align-top"
              >
                {texts[index]}
              </Navbar.Link>
            ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
