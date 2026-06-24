export type UserRole = "admin" | "manager" | "staff" | "visitor";
export type DemoUser = { email: string; name: string; role: UserRole };
export const roleLabels: Record<UserRole, string> = { admin: "Директор", manager: "Менеджер", staff: "Администратор", visitor: "Гость" };
