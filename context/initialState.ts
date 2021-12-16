import Cookies from "universal-cookie";
const cookies = new Cookies()
export const initialState = {
  token: cookies.get('jwt') || null,
  role_id: cookies.get('role_id') || null,
};
