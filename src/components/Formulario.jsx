import { useState, useEffect } from "react";
import { Alerta } from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);
  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      const fechaISO = new Date(paciente.fecha).toISOString().split("T")[0];
      setFecha(fechaISO);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({
      msg: "Guardado correctamente",
      error: false,
    });
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId(null);
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center mb-5">
        Formulario de pacientes
      </h2>
      <p className="text-xl text-center mb-10">
        Añade tus pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">
            Fecha de alta
          </label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl resize-none"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 rounded-lg w-full p-3 text-white font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={id ? "Guardar cambios" : "Registrar paciente"}
        />
      </form>
    </>
  );
};

export default Formulario;
