import { User } from './user';

export interface Group {
  id: number;
  user_id: number;
  role_id: number;
  is_active: number;
  agent_id: number;
  user: User;
}
