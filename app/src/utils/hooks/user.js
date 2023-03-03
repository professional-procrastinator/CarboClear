import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from '../axios';
const Context = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    const { data } = await axios.get('/auth/me');
    if (data.success) {
      setUser(data.user);
    }
    if (!data.success) {
      if (window.location.pathname === '/oauth/authorize') {
        window.location.href = '/login?next=' + window.location.href;
      } else {
        if (
          window.location.pathname !== '/' &&
          window.location.pathname !== '/login' &&
          window.location.pathname !== '/register'
        ) {
          window.location.pathname = '/login';
        }
      }
    } else {
      console.log(window.location.pathname);
      if (
        window.location.pathname == '/' ||
        window.location.pathname == '/login' ||
        window.location.pathname == '/register'
      ) {
        window.location.pathname = '/home';
      }
    }
    setLoading(false);
    setError(data.message);
    return setLoading(false);
  };

  useEffect(() => {
    if (loading == true) {
      fetchUser();
    }
  }, [loading]);

  const updateUser = async (user) => {
    const { data } = await axios.get('/auth/me');
    if (data.success) {
      setUser(data.user);
      return data.user;
    }
    return setError(data.message);
  };

  return (
    <Context.Provider value={{ user, setUser, error, loading, updateUser }}>
      {children}
    </Context.Provider>
  );
}

const useUserContext = () => useContext(Context);

export { UserProvider, useUserContext, Context };
