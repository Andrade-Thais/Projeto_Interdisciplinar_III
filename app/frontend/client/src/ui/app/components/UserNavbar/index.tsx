import { Navbar } from "flowbite-react";
import Image from "../../../../components/Shared/Image/Image";
import Profile from "./Profile";

export default function UserNavbar() {
  return (
    <Navbar fluid className="bg-primary">
      <Navbar.Brand>
        <Image
          src="/logo.png"
          className="ml-3"
          alt="Logo"
          width="100"
          height="100"
        />
      </Navbar.Brand>
      <Profile />
    </Navbar>
  );
}
