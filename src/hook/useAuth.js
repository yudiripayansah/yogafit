import {useReducer, useMemo, useEffect} from 'react';
import Store from '../config/Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: {...action.payload}};
    case 'REMOVE_USER':
      return {...state, user: undefined};
    case 'SET_GUEST':
      return {...state, guest: {...action.payload}};
    case 'REMOVE_GUEST':
      return {...state, guest: undefined};
    case 'SET_LOCATION':
      return {...state, location: {...action.payload}};
    case 'REMOVE_LOCATION':
      return {...state, location: undefined};
    default:
      return state;
  }
};

export function useAuth() {
  const [state, dispatch] = useReducer(reducer, {
    user: undefined,
    location: undefined,
    guest: undefined,
  });

  const auth = useMemo(() => ({
    setUser: async user => {
      Store.set('YOGAFITUSER', user);
      dispatch({type: 'SET_USER', payload: user});
    },
    removeUser: async () => {
      Store.remove('YOGAFITUSER');
      dispatch({type: 'REMOVE_USER'});
    },
  }), [dispatch]);

  const gst = useMemo(() => ({
    setGuest: async guest => {
      Store.set('YOGAFITGUEST', guest);
      dispatch({type: 'SET_GUEST', payload: guest});
    },
    removeGuest: async () => {
      Store.remove('YOGAFITGUEST');
      dispatch({type: 'REMOVE_GUEST'});
    },
  }), [dispatch]);

  const loc = useMemo(() => ({
    setLocation: async location => {
      Store.set('YOGAFITLOCATION', location);
      dispatch({type: 'SET_LOCATION', payload: location});
    },
    removeLocation: async () => {
      Store.remove('YOGAFITLOCATION');
      dispatch({type: 'REMOVE_LOCATION'});
    },
  }), [dispatch]);

  useEffect(() => {
    const init = async () => {
      const [user, location, guest] = await Promise.all([
        Store.get('YOGAFITUSER'),
        Store.get('YOGAFITLOCATION'),
        Store.get('YOGAFITGUEST'),
      ]);
      if (user) dispatch({type: 'SET_USER', payload: user});
      if (location) dispatch({type: 'SET_LOCATION', payload: location});
      if (guest) dispatch({type: 'SET_GUEST', payload: guest});
    };
    init();
  }, []);

  return {loc, auth, gst, state};
}
