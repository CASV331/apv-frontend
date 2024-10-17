import { useEffect, useState, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const autenticarUsuario = async () => {
      if (!token) {
        setCargando(false);

        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/veterinarios/perfil", config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  if (cargando) {
    return <div className="text-2xl">Cargando...</div>;
  }
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarPerfil = async (datos) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      await clienteAxios.put(url, datos, config);
      return {
        msg: "Almacenado correctamente",
        error: false,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async (datos) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "/veterinarios/cambiar-password";

      const { data } = await clienteAxios.put(url, datos, config);
      console.log(data);

      return {
        msg: data.msg,
        error: false,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        token,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
