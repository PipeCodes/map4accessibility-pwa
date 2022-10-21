/* eslint-disable no-undef */
export const AUTH_TOKEN_KEY = '@auth-Token';

export function isAuthenticated() {
  return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveAuthToken(authToken) {
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
}

export function clearLocalStorage() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
