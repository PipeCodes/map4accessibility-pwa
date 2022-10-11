/* eslint-disable no-undef */
export const AUTH_TOKEN_KEY = '@auth-Token';
export const LOGGED_USER_KEY = '@logged-User';
export const CURRENT_QUESTION_KEY = '@question';

export function isAuthenticated() {
  return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getLocalUser() {
  const user = localStorage.getItem(LOGGED_USER_KEY);
  return JSON.parse(user);
}

export function saveUser(user) {
  localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
}

export function saveUserData(authToken, user) {
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  saveUser(user);
}

export function clearLocalStorage() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(LOGGED_USER_KEY);
}
