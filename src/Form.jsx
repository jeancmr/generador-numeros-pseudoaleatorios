import { useState } from 'react';
import {
  validateMixto,
  validateMultiplicativo,
  validateCuadradoMedio,
  validateCuadratico,
  validateBBS,
} from './utils';
import Button from './Button';

export default function Form({ option, dispatch }) {
  const [params, setParams] = useState({
    a: '',
    b: '',
    c: '',
    m: '',
    x0: '',
    n: '',
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: Number(e.target.value) });
  };

  const validateParams = () => {
    const { a, b, c, m, x0, n } = params;

    let newErrors = [];

    if (option === 'mixto') {
      newErrors = validateMixto(a, c, m, x0);
    } else if (option === 'multiplicativo') {
      newErrors = validateMultiplicativo(a, m, x0);
    } else if (option === 'cuadradomedio') {
      newErrors = validateCuadradoMedio(x0, n);
    } else if (option === 'cuadratico') {
      newErrors = validateCuadratico(a, b, c, m, x0);
    } else if (option === 'bbs') {
      newErrors = validateBBS(a, b, x0);
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateParams()) {
      dispatch({ type: 'generateSequence', payload: params });
      if (option === 'bbs') {
        setParams({ ...params, m: params.a * params.b });
      }
    }
  };

  const inputFields = {
    mixto: ['a', 'c', 'm', 'x0', 'n'],
    multiplicativo: ['a', 'm', 'x0', 'n'],
    cuadradomedio: ['x0', 'n'],
    cuadratico: ['a', 'b', 'c', 'm', 'x0', 'n'],
    bbs: ['a', 'b', 'm', 'x0', 'n'],
  };

  const visibleFields = inputFields[option] || [];

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-lg font-bold mb-2">Generador de Números</h2>
      {errors.length > 0 && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {visibleFields.map((key) => (
        <div key={key} className="mb-2">
          <label className="block">{key.toUpperCase()}:</label>
          <input
            type="number"
            name={key}
            value={params[key]}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 border border-gray-600 w-full"
            required
            disabled={key === 'm' && option === 'bbs'}
          />
        </div>
      ))}

      <Button text="Generar" onClick={handleSubmit} type={'submit'} />
      <Button text="Volver" onClick={() => dispatch({ type: 'reset' })} />
    </form>
  );
}
