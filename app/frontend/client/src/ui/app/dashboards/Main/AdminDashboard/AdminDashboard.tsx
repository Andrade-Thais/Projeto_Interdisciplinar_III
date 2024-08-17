import { useState } from "react";
import Footer from "../../../../portfolio/components/Sections/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

export default function AdminDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Footer />
    </>
  );
}
