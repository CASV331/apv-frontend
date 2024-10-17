import { Link } from "react-router-dom";
import { useState } from "react";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

export const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password/",
        { email }
      );
      setAlerta({ msg: data.msg });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu acceso y no pierdas {""}{" "}
          <span className="text-black">tus pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-5 shadow-lg p-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mt-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Tu Email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar instrucciones"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 lg:w-auto self-center"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta?{" "}
            <span className="text-indigo-500">Inicia sesion</span>
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta?{" "}
            <span className="text-indigo-500">Registrate</span>
          </Link>
        </nav>
      </div>
    </>
  );
};
