export default function MethodSelection({ dispatch, options }) {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-lg font-bold mb-2">
        Seleccione un método para la generación de números aleatorios
      </h2>

      <div className="flex space-x-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => dispatch({ type: 'changeOption', payload: option.value })}
            className="bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}
