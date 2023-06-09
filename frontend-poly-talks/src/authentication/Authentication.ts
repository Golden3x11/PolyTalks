import jwtDecode from 'jwt-decode';
import React, { createContext } from 'react';
import { UserDto } from '../dto/user.dto';
import { Cookies } from 'react-cookie';

// token is stored both in localStorage (to use in services) and in react context (to use state for rerenders)
export const AuthContext = createContext<CurrentUser>({
  currentUser: undefined,
  setCurrentUser: (_) => {}
})

export interface CurrentUser {
  currentUser: UserDto | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserDto | undefined>>;
}

export function getLoggedInEmail(){
  const token = localStorage.getItem("token");

  return token ? jwtDecode<DecodedToken>(token).email : null;
}

export function getDecodedToken(){
  const token = localStorage.getItem("token");

  return token ? jwtDecode<DecodedToken>(token) : null;
}

export function getToken() {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith('token' + '=')) {
      return cookie.substring('token'.length + 1);
    }
  }

  return null;
}

export function decodeToken(token: string): DecodedToken {
  return jwtDecode<DecodedToken>(token);
}

export interface DecodedToken {
  name: string,
  email: string
}