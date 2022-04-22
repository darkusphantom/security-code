import React, { useState, useEffect, Fragment } from 'react';

const KEYWORD = 'dorime';

const UseState = ({ name }) => {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  })

  const onConfirm = () => {
      setState({
        ...state,
        loading: false,
        error: false,
        confirmed: true,
      });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    })
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    })
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true
    })
  };

  const onDelete = () => {
      setState({
        ...state,
        deleted: true,
      })
  };

  const onReset = () => {
    setState({
      ...state,
      deleted: false,
      confirmed: false,
      value: '',
    })
  };

  useEffect(() => {
    //Cuando hagas una consulta al backend o a una API, es bueno utilizar esta validacion por el render de react
    if(state.loading) {
      setTimeout(() => {
        if(state.value === KEYWORD){
          onConfirm();
        } else {
          onError();
        }
      }, 3000)
    }
  },[state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
     
        {(state.error && !state.loading) && (
          <p>Error: El codigo es incorrecto</p>
        )}

        {state.loading && (
          <p>Cargando...</p>
        )}

        <input
          type="text"
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) => onWrite(event.target.value)}
        />
        <button onClick={() => onCheck()}>
          Comprobar
        </button>
      </div>
    );
  }

  if (state.confirmed && !state.deleted) {
    return (
      <Fragment>
        <p>Estado de confirmacion: ¿Deseas eliminar?</p>
        <button
          onClick={ () => onDelete()}
        >
          Sure!
        </button>
        <button
          onClick={() => onReset()}
        >
          Nope, no me elimines
        </button>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <p>Jugador numero X, usted ha sido eliminado</p>
      <button
        onClick={() => onReset()}
      >
        Volver al pasado...
      </button>
    </Fragment>
  )

};

export { UseState };
