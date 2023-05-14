import jwtDecode from 'jwt-decode';
import React, { createContext } from 'react';
// token is stored both in localStorage (to use in services) and in react context (to use state for rerenders)
export const AuthContext = createContext<CurrentUser>({
  currentUser: undefined,
  setCurrentUser: (_) => {}
})

export interface CurrentUser {
  currentUser: DecodedToken | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<DecodedToken | undefined>>;
}

export function getLoggedInEmail(){
  const token = localStorage.getItem("token");

  return token ? jwtDecode<DecodedToken>(token).email : null;
}

export function getDecodedToken(){
  const token = localStorage.getItem("token");

  return token ? jwtDecode<DecodedToken>(token) : null;
}

export function decodeToken(token: string): DecodedToken {
  return jwtDecode<DecodedToken>(token);
}

export interface DecodedToken {
  name: string,
  email: string
}