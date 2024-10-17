import { act, useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import { Alerta } from "../components/Alerta";

const EditarPerfil = () => {
  const [alerta, setAlerta] = useState({});
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email, telefono } = perfil;
    if (telefono !== null && telefono.length < 10) {
      setAlerta({
        msg: "Ingresa un numero de telèfono valido",
        error: true,
      });
      return;
    }
    if ([nombre, email].includes("")) {
      setAlerta({
        msg: "Nombre y Email son obligatorios",
        error: true,
      });
      return;
    }
    setAlerta({});
    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Informacion aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="nomb"
                className="uppercase font-bold text-gray-600"
              >
                Nombre
              </label>
              <input
                id="nomb"
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="correo"
                className="uppercase font-bold text-gray-600"
              >
                Email
              </label>
              <input
                id="correo"
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="tel"
                className="uppercase font-bold text-gray-600"
              >
                Telefono
              </label>
              <input
                id="tel"
                type="number"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]:
                      e.target.value === "" ? null : e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="sitio"
                className="uppercase font-bold text-gray-600"
              >
                Sitio Web
              </label>
              <input
                id="sitio"
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]:
                      e.target.value === "" ? null : e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              value="Guardar cambios"
              className="bg-indigo-700 px-10 py-3 font-bold w-full rounded-lg text-white uppercase mt-5 hover:bg-indigo-800 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
