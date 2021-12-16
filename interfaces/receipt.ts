export interface Receipt {
  _id: string
  issue_date: string;
  policy_id: string;
  client_id: number;
  vehicle_id: number;
  observations: string;
  receipt_number: number;
  prima: number;
  prima_payment_frecuency: number;
  total_sum_insured: number;
  agent_bonus: number;
  deducible: number;
  next_payment_date: string;
  valid_from: string;
  valid_until: string;
  created_at: Date;
  updated_at: Date;
  code: number;
  policy_code: number,
}
