import React, { useState, useEffect } from 'react';

const UseState = ({ name }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Empezando el efecto");
    
    //Cuando hagas una consulta al backend o a una API, es bueno utilizar esta validacion por el render de react
    if(loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        setLoading(false)
        console.log("Terminando la validacion");
      }, 3000)
    }

    console.log("Terminando el efecto");
  },[loading])

  return (
    <div>
      <h2>Eliminar {name}</h2>
      
      <p>Por favor, escribe el código de seguridad</p>

      {error && (
        <p>Error: El codigo es incorrecto</p>
      )}

      {loading && (
        <p>Cargando...</p>
      )}

      <input type="text" placeholder="Codigo de seguridad" />
      <button
        onClick={() => setLoading(true)}
      >Comprobar</button>
    </div>
  );
};

export { UseState };
