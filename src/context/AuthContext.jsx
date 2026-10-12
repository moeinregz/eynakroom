import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(() => localStorage.getItem('eynakroom_user') || '');
  const [token, setToken] = useState(() => localStorage.getItem('eynakroom_token') || '');

  const login = useCallback(async (u, p) => {
    const data = await api.login(u, p);
    localStorage.setItem('eynakroom_token', data.token);
    localStorage.setItem('eynakroom_user', data.username);
    setToken(data.token);
    setUsername(data.username);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('eynakroom_token');
    localStorage.removeItem('eynakroom_user');
    setToken('');
    setUsername('');
  }, []);

  return (
    <AuthContext.Provider value={{ username, token, isAuthed: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
