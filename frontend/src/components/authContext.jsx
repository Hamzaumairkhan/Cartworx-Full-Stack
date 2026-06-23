import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
