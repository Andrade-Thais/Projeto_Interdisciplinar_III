import Portfolio from "./ui/portfolio/pages/Portfolio/Portfolio";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./components/Shared/BootstrapCustomTheme.scss";
import { UserForm } from "./ui/app/forms/NewClient/pages/UserForm";
import CRUD from "./ui/app/tables/ClientCRUD/pages/CRUD";
import Agenda from "./ui/app/calendar/Calendar";
import { NewAppointmentForm } from "./ui/app/forms/Appointments/NewApointment/pages/NewApointment";
import { EditAppointmentForm } from "./ui/app/forms/Appointments/EditAppointment/pages/EditAppointment";
import { DeleteAppointmentForm } from "./ui/app/forms/Appointments/DeleteAppointment/pages/DeleteAppointment";
import FinancialDashboard from "./ui/app/dashboards/Financial/FinancialDashboard";
import OutgoingForm from "./ui/app/forms/Financials/pages/OutgoingForm";
import NotFound from "./ui/404/NotFound";
import RevenueForm from "./ui/app/forms/Financials/pages/RevenueForm";
import GalleryDashboard from "./ui/app/dashboards/Gallery/GalleryDashboard";
import Galeria from "./ui/portfolio/components/Gallery/Galeria";
import GalleryForm from "./ui/app/forms/Galleries/pages/GalleryForm";
import GalleryView from "./ui/app/gallery/pages/GalleryView/GalleryView";
import FolderView from "./ui/app/gallery/pages/FolderView/FolderView";

import Login from "./ui/auth/Login/Login";
import { useContext } from "react";
import AdminDashboard from "./ui/app/dashboards/Main/AdminDashboard/AdminDashboard";
import { UserTypeProvider } from "./contexts/auth/UserRoleContext";
import { useUserType } from "./contexts/auth/UserRoleContext";
import { AuthContext, AuthProvider } from "./contexts/auth/AuthContext";
import withAuthCheck from "./components/Auth/AuthWrapper";
import RedirectPage from "./ui/email/RedirectPage";

const ProtectedRoute = withAuthCheck(
  //Precisa mudar a lógica dos contextos
  ({ element, userType: allowedUserType }) => {
    const { userType, setUserType } = useUserType();
    const { isLoggedIn } = useContext(AuthContext);

    console.log(isLoggedIn, userType);
    return isLoggedIn && userType === allowedUserType ? (
      React.cloneElement(element, { userType })
    ) : (
      <Navigate to="/auth/login" replace />
    );
  }
);

function App() {
  const { email } = useParams();
  return (
    <BrowserRouter>
      <UserTypeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/galeria" element={<Galeria />} />

            <Route path="*" element={<NotFound />} />

            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/login-user/:email" element={<RedirectPage />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute element={<AdminDashboard />} userType="admin" />
              }
            />
            <Route
              path="/app/clientes"
              element={<ProtectedRoute element={<CRUD />} userType="admin" />}
            />
            <Route
              path="/app/novo-cliente"
              element={
                <ProtectedRoute element={<UserForm />} userType="admin" />
              }
            />
            <Route
              path="/app/editar-cliente/:id"
              element={
                <ProtectedRoute element={<UserForm />} userType="admin" />
              }
            />

            <Route
              path="/app/agenda"
              element={<ProtectedRoute element={<Agenda />} userType="admin" />}
            />
            <Route
              path="/app/novo-compromisso"
              element={
                <ProtectedRoute
                  element={<NewAppointmentForm />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/editar-compromisso"
              element={
                <ProtectedRoute
                  element={<EditAppointmentForm />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/excluir-compromisso"
              element={
                <ProtectedRoute
                  element={<DeleteAppointmentForm />}
                  userType="admin"
                />
              }
            />

            <Route
              path="/app/financeiro"
              element={
                <ProtectedRoute
                  element={<FinancialDashboard />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/nova-despesa"
              element={
                <ProtectedRoute element={<OutgoingForm />} userType="admin" />
              }
            />
            <Route
              path="/app/nova-receita"
              element={
                <ProtectedRoute element={<RevenueForm />} userType="admin" />
              }
            />

            <Route
              path="/app/galerias"
              element={
                <ProtectedRoute
                  element={<GalleryDashboard />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/nova-galeria"
              element={
                <ProtectedRoute element={<GalleryForm />} userType="admin" />
              }
            />
            <Route
              path="/app/editar-galeria/:id"
              element={
                <ProtectedRoute element={<GalleryForm />} userType="admin" />
              }
            />
            <Route
              path="/app/galerias/:id"
              element={
                <ProtectedRoute
                  element={<GalleryView userRole="admin" />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/galerias/:id/pastas/:pastaId"
              element={
                <ProtectedRoute
                  element={<FolderView userRole="admin" />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/galerias/:id/pastas/:pastaId/cliente"
              element={
                <ProtectedRoute
                  element={<FolderView userRole="user" />}
                  userType="admin"
                />
              }
            />
            <Route
              path="/app/galerias/:id/cliente"
              element={
                <ProtectedRoute
                  element={<GalleryView userRole="user" />}
                  userType="admin"
                />
              }
            />
          </Routes>
        </AuthProvider>
      </UserTypeProvider>
    </BrowserRouter>
  );
}

export default App;
