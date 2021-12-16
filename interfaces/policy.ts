export interface Policy {
  _id: string;
  type: string;
  title: string;
  code: number;
  date: string;
  enabled: boolean;
  renewable: boolean;
  vehicle_value: number;
  vehicle_id: number;
  client_id: number;
  observations: string;
  created_at: Date;
  updated_at: Date;
  receipt_id: string;
  coverage_form_type: string;
  receipt_code: string,
  agent_id: number
}
