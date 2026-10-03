import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import { loginSuccess, registerSuccess, logout, restoreAuth } from "@/lib/auth-slice";
import type { User } from "@/lib/auth-slice";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const users = useSelector((state: RootState) => state.auth.users);

  const login = useCallback((email: string, password: string): User | null => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      dispatch(loginSuccess(found));
      return found;
    }
    return null;
  }, [dispatch, users]);

  const register = useCallback((name: string, email: string, password: string): User | null => {
    if (users.find((u) => u.email === email)) return null;
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      password,
      createdAt: new Date().toISOString(),
    };
    dispatch(registerSuccess(newUser));
    return newUser;
  }, [dispatch, users]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const restore = useCallback(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  return { user, users, login, register, logOut, restore };
}
