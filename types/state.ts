import { User } from "~/types/user";

export interface AuthenticationState {
  authenticated: boolean
  user: User
}
