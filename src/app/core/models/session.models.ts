import { User } from "./users.models";

export interface Session {
  status: boolean;
  token: string;
  users: User[];
}
