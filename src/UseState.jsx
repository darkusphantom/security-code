import React, { useState } from 'react';

const UseState = ({ name }) => {
  const [error, setError] = useState(false);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      
      <p>Por favor, escribe el código de seguridad</p>

      {error && (
        <p>Error: El codigo es incorrecto</p>
      )}

      <input type="text" placeholder="Codigo de seguridad" />
      <button
        {/*onClick={() => setError(prevState => !prevState)}*/}
        onClick={() => setError(!error)}
      >Comprobar</button>
    </div>
  );
};

export { UseState };
