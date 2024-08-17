import { useState } from "react";
import Home from "../Home/Home";
import {
  BsArrowLeftCircle,
  BsFillBarChartFill,
  BsFillCalendarFill,
  BsFillFolderFill,
  BsFillPersonFill,
  BsFillPieChartFill,
} from "react-icons/bs";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", icon: BsFillPieChartFill, href: "/app" },
    {
      title: "Cadastro de Clientes",
      icon: BsFillPersonFill,
      gap: true,
      href: "/app/clientes",
    },
    {
      title: "Gerenciamento Financeiro",
      icon: BsFillBarChartFill,
      href: "/app/financeiro",
    },
    { title: "Agenda", icon: BsFillCalendarFill, href: "/app/agenda" },
    {
      title: "Gerenciamento de Galerias",
      icon: BsFillFolderFill,
      href: "/app/galerias",
    },
  ];

  return (
    <div className="flex w-full min-h-screen h-full">
      <div
        className={`relative ${
          open ? "w-full sm:w-72" : "w-20"
        } bg-sidebar min-h-screen pt-8 duration-300`}
      >
        <div className="absolute top-3 -right-3 transform">
          <BsArrowLeftCircle
            className={`cursor-pointer w-7 h-7 border-dark-purple border-2 rounded-full ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex gap-x-4 items-center px-4">
          <img
            src="./logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`m-4 text-primary origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            {}
          </h1>
        </div>
        <ul className="pt-6 m-3">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-success text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
            >
              <Menu.icon className="w-6 h-6" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <a href={Menu.href}>{Menu.title}</a>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow p-7">
        <Home />
      </div>
    </div>
  );
};

export default Sidebar;
