export interface Agent {
  id: number;
  name: string;
  lastname: string;
  bono:number;
  email: string;
  password: string;
  emailConfirm: string;
  passwordConfirm: string;
  user: {
    id: number;
    name: string;
    lastname: string;
    bono:number;
  }
}
