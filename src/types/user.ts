export interface User {
  id: number;
  email: string;
  status: "active" | "blocked";
  lastLoginAt: string | null;
}
