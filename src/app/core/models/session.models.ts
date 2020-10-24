import { User } from "./users.models";

export interface Session {
  token: string;
  users: User[];
  status?: boolean;
  messages?: string;
}
