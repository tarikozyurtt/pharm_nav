import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (token, userInfo) => {
    // Perform authentication logic here
    // const response = {"userInfo": {"userEmail": "tarik@gmail.com", "userName": "tarik oz"}, "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ODZjM2VjNTA5NWFkODc1MWQyYjJlZCIsIm5hbWUiOiJ0YXJpayBveiIsImVtYWlsIjoidGFyaWtAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbk5taFprU2xRdHNZa3A1L3B1em0zdXZUbG84OGRpTW1ZY0t3RHhvaWY1U3VTT2pRNlc5Si4iLCJtZXNzYWdlcyI6W10sIl9fdiI6MH0sImlhdCI6MTcwMzQzOTY3MX0.E_f1B-E_JU7__Hs6EG1N9zZrGcgx0s8KJ9v4-YVdoR4"}
    setUser({ token, ...userInfo });
  };

  const signOut = () => {
    // Perform sign-out logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);