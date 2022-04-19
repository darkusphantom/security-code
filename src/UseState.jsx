import React, { useState, useEffect } from 'react';

const KEYWORD = 'dorime';

const UseState = ({ name }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Cuando hagas una consulta al backend o a una API, es bueno utilizar esta validacion por el render de react
    if(loading) {
      setTimeout(() => {
        if(value === KEYWORD){
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      }, 3000)
    }

  },[loading])


  return (
    <div>
      <h2>Eliminar {name}</h2>
      
      <p>Por favor, escribe el código de seguridad</p>

      {(error && !loading) && (
        <p>Error: El codigo es incorrecto</p>
      )}

      {loading && (
        <p>Cargando...</p>
      )}

      <input
        type="text"
        placeholder="Codigo de seguridad"
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
      />
      <button
        onClick={() => {
          setLoading(true);
          //setError(false);
        }}
      >Comprobar</button>
    </div>
  );
};

export { UseState };
