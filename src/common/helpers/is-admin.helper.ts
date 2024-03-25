import { UserRole } from "@tutorify/shared";
import { IAccessToken } from "src/auth/auth.interfaces";

export function isAdmin(token: IAccessToken) {
    const userRole = token.roles[0];
    return userRole === UserRole.ADMIN || userRole === UserRole.MANAGER;
}