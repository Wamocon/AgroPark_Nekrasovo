export type UserRole = "admin" | "manager" | "staff" | "visitor";

export interface User {
 email: string;
 name: string;
 role: UserRole;
}

export function requireRole(
 user: User | null,
 allowedRoles: UserRole[]
): user is User {
 return !!user && allowedRoles.includes(user.role);
}

export const roleLabels: Record<UserRole, string> = {
 admin: "Administrator",
 manager: "Manager",
 staff: "Mitarbeiter",
 visitor: "Besucher",
};
