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
        case 'SET_LOCATION':
          return {
            ...state,
            location: {...action.payload},
          };
          break;
        case 'REMOVE_LOCATION':
          return {
            ...state,
            location: undefined,
          };
          break;
        default:
          return state;
          break;
      }
    },
    {
      user: undefined,
      location: undefined
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
  const loc = useMemo(() => ({
    setLocation: async location => {
      Store.set('YOGAFITLOCATION', location);
      dispatch(createAction('SET_LOCATION', location));
    },
    removeLocation: async () => {
      Store.remove('YOGAFITLOCATION');
      dispatch(createAction('REMOVE_LOCATION'));
    },
  }));
  const checkUser = async () => {
    let user = await Store.get('YOGAFITUSER');
    if (user) {
      dispatch(createAction('SET_USER', user));
    }
  };
  const checkLocation = async () => {
    let location = await Store.get('YOGAFITLOCATION');
    if (location) {
      dispatch(createAction('SET_LOCATION', location));
    }
  };
  useEffect(() => {
    checkUser();
    checkLocation();
  }, []);
  return {loc, auth, state};
}
