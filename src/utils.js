export function congruencialMixto(a, c, m, x0, n) {
  let sequence = [];
  let x = x0;
  let normalizedValues = [];
  let seen = new Set();

  for (let i = 0; i < n; i++) {
    x = (a * x + c) % m;

    if (seen.has(x)) {
      break;
    }

    seen.add(x);
    sequence.push(x);
    normalizedValues.push(x / m);
  }

  let period = sequence.length;

  return { sequence, period, normalizedValues };
}

export function congruencialMultiplicativo(a, m, x0, n) {
  let sequence = [];
  let x = x0;
  let normalizedValues = [];
  let seen = new Set();

  for (let i = 0; i < n; i++) {
    x = (a * x) % m;

    if (seen.has(x)) {
      break;
    }

    seen.add(x);
    sequence.push(x);
    normalizedValues.push(x / m);
  }

  let period = sequence.length;

  return { sequence, period, normalizedValues };
}

export function validateMixto(a, c, m, x0) {
  let errors = [];

  if (x0 <= 0) errors.push('x0 debe ser mayor a 0.');
  if (c <= 0) errors.push('c debe ser mayor a 0.');
  if (m <= x0 || m <= a || m <= c) errors.push('m debe ser mayor que x0, a y c.');
  if (c % 2 === 0) errors.push('c debe ser impar.');
  if (c % 8 !== 5) errors.push('Para mejores resultados, c % 8 debe ser igual a 5.');

  return errors;
}

export function validateMultiplicativo(a, m, x0) {
  let errors = [];

  if (x0 % 2 === 0) {
    errors.push('x0 debe ser un número impar.');
  }
  if (x0 < 1) {
    errors.push('x0 debe ser un número mayor a 0');
  }

  //relativamente primo
  if (gcd(x0, m) !== 1) {
    errors.push('x0 debe ser relativamente primo a m.');
  }

  if (!isValidMultiplier(a)) {
    errors.push('a debe ser de la forma 8t ± 3 para algún entero t.');
  }

  if (!isPowerOfTwo(m)) {
    errors.push('m debe ser una potencia de 2.');
  }

  return errors;
}

function isValidMultiplier(a) {
  return (a - 3) % 8 === 0 || (a + 3) % 8 === 0;
}

function isPowerOfTwo(n) {
  return (n & (n - 1)) === 0 && n > 0;
}

export function cuadradoMedio(x0, cantidad) {
  let x = x0.toString();
  let n = x.length;
  let divisor = Math.pow(10, n);
  let sequence = [];
  let normalizedValues = [];

  for (let i = 0; i < cantidad; i++) {
    let squared = (x * x).toString();

    //agregando ceros a la izquierda para que tenga 2n dígitos de ser necesario
    while (squared.length < 2 * n) {
      squared = '0' + squared;
    }

    // extrayendo los n dígitos centrales
    let start = (squared.length - n) / 2;
    let new_x = squared.substr(start, n);

    // si el numero resultante tiene menos de n dígitos se agrega ceros a la izquierda
    while (new_x.length < n) {
      new_x = '0' + new_x;
    }

    x = parseInt(new_x, 10);

    sequence.push(x);
    normalizedValues.push(x / divisor);

    // Si x es cero se acaba la secuencia
    if (x === 0) break;
  }

  return { sequence, normalizedValues };
}

export function validateCuadradoMedio(x0, n) {
  let errors = [];
  let digits = x0.toString().length;

  if (x0 <= 0) errors.push('x0 debe ser mayor a 0.');
  if (digits < 2) errors.push('x0 debe tener al menos 2 dígitos.');
  if (digits % 2 !== 0) errors.push('x0 debe tener un número par de dígitos.');
  if (n <= 0) errors.push('n debe ser mayor a 0.');

  return errors;
}

export function congruencialCuadratico(a, b, c, m, x0, n) {
  let sequence = [];
  let x = x0;
  let normalizedValues = [];
  let seen = new Set();

  for (let i = 0; i < n; i++) {
    x = (a * x * x + b * x + c) % m;

    sequence.push(x);
    normalizedValues.push(x / (m - 1));

    if (seen.has(x)) {
      break;
    }

    seen.add(x);
  }

  let period = sequence.length - 1;

  return { sequence, period, normalizedValues };
}

export function validateCuadratico(a, b, c, m, x0) {
  let errors = [];
  const g = Math.log2(m);

  if (m < 0 || g % 1 !== 0) errors.push('❌ m debe ser una potencia de 2 y mayor a cero.');
  if (a % 2 !== 0) errors.push('❌ a debe ser un número par.');
  if (c % 2 === 0) errors.push('❌ c debe ser un número impar.');
  if (!Number.isInteger(x0) || x0 <= 0) errors.push('❌ X0 debe ser un número entero positivo.');

  return errors;
}

export function blumBlumShub(p, q, x0, n) {
  const M = p * q;
  let x = x0 % M;
  let sequence = [];
  let normalizedValues = [];
  let seen = new Set();

  for (let i = 0; i < n; i++) {
    x = (x * x) % M;

    sequence.push(x);
    normalizedValues.push(x / M);

    if (seen.has(x)) {
      break;
    }

    seen.add(x);
  }

  let period = sequence.length - 1;

  return { sequence, period, normalizedValues };
}

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

export const validateBBS = (p, q, seed) => {
  let errors = [];

  if (!isPrime(p) || !isPrime(q)) {
    errors.push('a y b deben ser primos.');
  }

  if (p % 4 !== 3 || q % 4 !== 3) {
    errors.push('a y b deben ser primos congruentes a 3 módulo 4.');
  }

  if (seed <= 0) {
    errors.push('La semilla debe ser un número positivo.');
  }

  const M = p * q;
  if (gcd(seed, M) !== 1) {
    errors.push('La semilla debe ser coprima con M.');
  }

  return errors;
};

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
