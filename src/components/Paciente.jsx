import usePacientes from "../hooks/usePacientes";

export const Paciente = ({ paciente }) => {
  const { nombre, fecha, email, propietario, sintomas, _id } = paciente;
  const { editarPaciente, eliminarPaciente } = usePacientes();

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMinutes(
      nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
    );
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-gray-700 my-2">
        Nombre: {""}
        <span className="font-normal normal-case">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-gray-700 my-2">
        Propietario: {""}
        <span className="font-normal normal-case">{propietario}</span>
      </p>
      <p className="font-bold uppercase text-gray-700 my-2">
        Email: {""}
        <span className="font-normal normal-case">{email}</span>
      </p>
      <p className="font-bold uppercase text-gray-700 my-2">
        Fecha de alta: {""}
        <span className="font-normal normal-case">{formatearFecha(fecha)}</span>
      </p>
      <p className="font-bold uppercase text-gray-700 my-2">
        sintomas: {""}
        <span className="font-normal normal-case">{sintomas}</span>
      </p>
      <div className="flex justify-between my-5 flex-col md:flex-row">
        <button
          type="button"
          className="py-3 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase rounded-lg font-bold mt-5 md:mt-0"
          onClick={() => editarPaciente(paciente)}
        >
          Editar
        </button>
        <button
          type="button"
          className="py-3 px-10 bg-red-600 hover:bg-red-700 text-white uppercase rounded-lg font-bold mt-5 md:mt-0"
          onClick={() => eliminarPaciente(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
