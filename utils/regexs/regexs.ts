export const Regexs = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
  password: /(.){6,20}$/,
  phone: /^(\+)?([0-9]{10,16})+$/,
  alphanumeric: /^[a-zA-Z0-9]+( [a-zA-Z0-9_]+)*$/,
  numeric: /^\d+(\.\d+)?$/,
  characters: /^[a-zA-Z]+( [a-zA-Z]+)*$/,
};
