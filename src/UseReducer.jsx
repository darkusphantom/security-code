import React, { useReducer, useEffect, Fragment } from 'react';

const KEYWORD = 'dorime';

const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onConfirm = () => dispatch({ type: actionTypes.confirm});
  const onError = () => dispatch({ type: actionTypes.error });

  const onWrite = ({ target: { value } }) => {
    dispatch({
      type: actionTypes.write,
      payload: value
    })
  };

  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  useEffect(() => {
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
          onChange={onWrite}
        />
        <button onClick={onCheck}>
          Comprobar
        </button>
      </div>
    );
  }

  if (state.confirmed && !state.deleted) {
    return (
      <Fragment>
        <p>Estado de confirmacion: ¿Deseas eliminar?</p>
        <button onClick={onDelete}>
          Sure!
        </button>
        <button onClick={onReset}>
          Nope, no me elimines
        </button>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <p>Jugador numero X, usted ha sido eliminado</p>
      <button onClick={onReset}>
        Volver al pasado...
      </button>
    </Fragment>
  )
};

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
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
