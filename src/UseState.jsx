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

  useEffect(() => {
    //Cuando hagas una consulta al backend o a una API, es bueno utilizar esta validacion por el render de react
    if(state.loading) {
      setTimeout(() => {
        if(state.value === KEYWORD){
          setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
          });
        } else {
          setState({
            ...state,
            loading: false,
            error: true,
          });
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
          onChange={(event) => {
            setState({
              ...state,
              value: event.target.value
            })
          }}
        />
        <button
          onClick={() => setState({
            ...state,
            loading: true
          })}
        >
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
          onClick={ () => {
              setState({
                ...state,
                deleted: true,
              })
            }
          }
        >
          Sure!
        </button>
        <button
          onClick={ () => {
              setState({
                ...state,
                confirmed: false,
                value: '',
              })
            }
          }
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
        onClick={() => {
          setState({
            ...state,
            deleted: false,
            confirmed: false,
            value: '',
          })
        }}
      >
        Volver al pasado...
      </button>
    </Fragment>
  )

};

export { UseState };
