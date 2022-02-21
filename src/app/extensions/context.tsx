import { User } from 'generated/graphql';
import React, { createContext, FC, useState } from 'react';

const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: User | null) => void;
  // eslint-disable-next-line no-unused-vars
  setLoading: (loading: boolean) => void;
}>({
  user: null,
  isAuthenticated: true,
  loading: true,
  setUser: () => {},
  setLoading: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactElement;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        setUser,
        setLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };

export default AuthContext;
