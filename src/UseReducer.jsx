import React, { useReducer, useEffect, Fragment } from 'react';

const KEYWORD = 'dorime';

const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if(state.loading) {
      setTimeout(() => {
        if(state.value === KEYWORD){
          dispatch({ type: 'CONFIRM' });
        } else {
          dispatch({ type: 'ERROR' });
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
          onChange={(event) => dispatch({
            type: 'WRITE',
            payload: event.target.value
          })}
        />
        <button onClick={() => dispatch({ type: 'CHECK' })}>
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
          onClick={ () => dispatch({ type: 'DELETED' })}
        >
          Sure!
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
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
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Volver al pasado...
      </button>
    </Fragment>
  )
};

const initialState = () => ({
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
});

const reducerObject = (state, payload) => ({
  'CONFIRM': {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  },
  'WRITE': {
    ...state,
    value: payload
  },
  'CHECK': {
    ...state,
    loading: true,
  },
  'DELETED': {
    ...state,
    deleted: true,
  },
  'RESET': {
    ...state,
    deleted: false,
    confirmed: false,
    value: '',
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}

export { UseReducer };
