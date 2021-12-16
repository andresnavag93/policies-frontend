export interface Vehicle {
  id: number;
  client_id: number;
  policy_id: string;
  plate: string;
  serial: string;
  brand: string;
  model: string;
  year: number;
  civi: string;
  version: string;
  doors_no: number;
  pasajeros: string;
  type: string;
  rate_width_coverage: number;
  rate_total_lost: number;
  sum_assured: number;
  created_at: Date;
  updated_at: Date;
}
