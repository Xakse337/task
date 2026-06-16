export interface User {
  displayId: number;
  email: string;
  status: "active" | "blocked";
  lastLoginAt: string | null;
}
