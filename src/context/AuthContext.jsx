// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     const savedToken = localStorage.getItem('token');
//     if (savedUser && savedToken) {
//       setUser(JSON.parse(savedUser));
//       setToken(savedToken);
//     }
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     const savedToken = localStorage.getItem('token');
//     if (savedUser && savedToken) {
//       setUser(JSON.parse(savedUser));
//       setToken(savedToken);
//     }
//   }, []);

//   const login = (userData, jwtToken) => {
//     setUser(userData);
//     setToken(jwtToken);
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', jwtToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.clear();
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, token, login, logout, loading, setLoading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
