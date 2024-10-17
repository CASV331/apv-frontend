import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import { Login } from "./pages/Login";
import { Registrar } from "./pages/Registrar";
import { ConfirmarCuenta } from "./pages/ConfirmarCuenta";
import { OlvidePassword } from "./pages/OlvidePassword";
import { NuevaContraseña } from "./pages/NuevaContraseña";
import AdministrarPacientes from "./pages/AdministrarPacientes";
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import EditarPerfil from "./pages/EditarPerfil";
import CambiarPassword from "./pages/CambiarPassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:id" element={<NuevaContraseña />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          <Route
            path="/admin"
            element={
              <PacientesProvider>
                <RutaProtegida />
              </PacientesProvider>
            }
          >
            <Route index element={<AdministrarPacientes />} />
            <Route path="perfil" element={<EditarPerfil />} />
            <Route path="cambiar-password" element={<CambiarPassword />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
