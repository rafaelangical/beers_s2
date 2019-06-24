export const TOKEN = "tokenns";
export const isAuthenticated = () => localStorage.getItem(TOKEN) !== null;
export const getToken = () => localStorage.getItem(TOKEN);
export const login = token => {
  localStorage.setItem(TOKEN, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN);
};