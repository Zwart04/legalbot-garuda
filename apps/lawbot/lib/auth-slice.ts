import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  users: User[];
}

const DEFAULT_USERS: User[] = [
  {
    id: "demo-admin",
    email: "admin@lawbot.id",
    name: "Admin LawBot",
    password: "admin123",
    createdAt: new Date().toISOString(),
  },
];

const loadUsers = (): User[] => {
  if (typeof window === "undefined") return DEFAULT_USERS;
  try {
    const stored = localStorage.getItem("hf_users");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_USERS;
};

const saveUsers = (users: User[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("hf_users", JSON.stringify(users));
};

const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return DEFAULT_USERS;
  try {
    const stored = localStorage.getItem("hf_users");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_USERS;
};

const storedUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("hf_user");
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return null;
};

const initialState: AuthState = {
  user: storedUser(),
  users: getStoredUsers(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("hf_user", JSON.stringify(action.payload));
      }
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("hf_users", JSON.stringify(state.users));
        localStorage.setItem("hf_user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("hf_user");
      }
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("hf_users", JSON.stringify(action.payload));
      }
    },
    restoreAuth: (state) => {
      const user = storedUser();
      const users = getStoredUsers();
      state.user = user;
      state.users = users;
    },
  },
});

export const { loginSuccess, registerSuccess, logout, setUsers, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
