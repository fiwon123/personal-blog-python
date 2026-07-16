import { useEffect, useState } from 'react';
import type { Props } from '../types/props'
import { AuthContext } from './AuthContext.ts'
import { api } from './useApi.ts'

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.get("/v1/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await api.post("/v1/auth/login", { username, password }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user)
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


