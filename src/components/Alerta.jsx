

export const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'bg-red-600' : 'bg-indigo-600'}
    text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
        {alerta.msg}
    </div>
  )
};

