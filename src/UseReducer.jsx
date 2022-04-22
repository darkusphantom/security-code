const initialState = () => {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

//const reducer = (state, action) => {
//};

// Formas de crear un estado
// 1. Con If
const reducer = (state, action) => {
  if(action.type === 'ERROR') {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === 'CHECK') {
    return {
      ...state,
      loading: true,
    };
  } else {
    return {
      ...state.
    };
  }
};

// 2. Switch (La mas comun)
const reducerSwitch = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      };
      break;

    case 'CHECK':
      return {
        ...state,
        loading: true,
      };
    
    default:
      return {
        ...state,
      };
  }
};

// 3. Object (La forma simple)
const reducerObject = (state) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  },
  'CHECK': {
    ...state,
    error: true,
    loading: false,
  },
});

const reducerObject = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state)[action.type];
  } else {
    return state;
  }
}
