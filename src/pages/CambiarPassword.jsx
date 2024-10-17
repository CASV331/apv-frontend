import { useState } from "react";
import AdminNav from "../components/AdminNav";
import { Alerta } from "../components/Alerta";
import useAuth from "../hooks/useAuth";
const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_act: "",
    pwd_nv: "",
  });
  const { guardarPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password.pwd_nv.length < 6) {
      setAlerta({
        msg: "La contraseña debe contener minimo 6 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({});
    const resultado = await guardarPassword(password);
    setAlerta(resultado);
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar contraseña
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Contraseña aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="pwd_act"
                className="uppercase font-bold text-gray-600"
              >
                Contraseña actual
              </label>
              <input
                id="pwd_act"
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_act"
                placeholder="Escribe tu constraseña actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="pwd_nv"
                className="uppercase font-bold text-gray-600"
              >
                Nueva contraseña
              </label>
              <input
                id="pwd_nv"
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_nv"
                placeholder="Escribe tu nueva constraseña"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              value="Actualizar contraseña"
              className="bg-indigo-700 px-10 py-3 font-bold w-full rounded-lg text-white uppercase mt-5 hover:bg-indigo-800 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
