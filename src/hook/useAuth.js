import React, {useReducer, useMemo, useEffect} from 'react';
import Store from '../config/Store';
const createAction = (type, payload) => {
  return {
    type,
    payload,
  };
};
export function useAuth() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
          break;
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
          break;
        default:
          return state;
          break;
      }
    },
    {
      user: undefined,
    },
  );
  const auth = useMemo(() => ({
    setUser: async user => {
      Store.set('YOGAFITUSER', user);
      dispatch(createAction('SET_USER', user));
    },
    removeUser: async () => {
      Store.remove('YOGAFITUSER');
      dispatch(createAction('REMOVE_USER'));
    },
  }));
  const checkUser = async () => {
    let user = await Store.get('YOGAFITUSER');
    if (user) {
      dispatch(createAction('SET_USER', user));
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return {auth, state};
}
