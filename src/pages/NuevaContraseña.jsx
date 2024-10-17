import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios";

export const NuevaContraseña = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${id}`);
        setAlerta({
          msg: "Ingresa tu nueva contraseña",
          error: false,
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe ser de minimo 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${id}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
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
          Restablece tu contraseña y no pierdas acceso a {""}
          <span className="text-black">tus pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-5 shadow-lg p-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && !passwordModificado && (
          <>
            <form onSubmit={handleSubmit}>
              <>
                <div className="mt-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    Tu nueva contraseña
                  </label>
                  <input
                    type="text"
                    placeholder="Nueva contraseña"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Cambiar contraseña"
                  className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 lg:w-auto self-center"
                />
              </>
            </form>
          </>
        )}
        {passwordModificado && (
          <Link className="block text-center my-5" to="/">
            <span className="text-indigo-500">Inicia sesion</span>
          </Link>
        )}
      </div>
    </>
  );
};
