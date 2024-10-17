import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios";

export const Login = () => {
  const { setAuth, token, cargando } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!cargando && token) {
      navigate("/admin");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    setAlerta({});

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/admin");
      setAlerta({
        msg: "Inicio de sesion correcto",
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const { msg } = alerta;

  if (cargando || token) {
    return null; // No renderiza nada si está cargando o si hay token
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia sesion y administra a tus {""}{" "}
          <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-5 shadow-lg p-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mt-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Constraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Constraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar sesion"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 lg:w-auto self-center"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta?{" "}
            <span className="text-indigo-500">Registrate</span>
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvide mi constraseña
          </Link>
        </nav>
      </div>
    </>
  );
};
