export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
  document: number;
  cellphone: string;
  occupation: string;
  razon_social:string;
  gender_id: number;
  gender: {
    id: number,
    name: string
  };
  document_type_id: number;
  document_type: {
    id: number,
    name: string
  };
  civil_status_id: number;
  civil_status: {
    id: number,
    name: string
  };
  agent_id: number;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}
