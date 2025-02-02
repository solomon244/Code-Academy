import { User } from '@prisma/client';

export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export const hasRole = (user: User | null, role: Role | Role[]): boolean => {
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role as Role);
  }
  
  return user.role === role;
};

export const isInstructor = (user: User | null): boolean => {
  return hasRole(user, ['INSTRUCTOR', 'ADMIN']);
};

export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, 'ADMIN');
};

export const canManageCourse = (user: User | null, courseCreatorId: string): boolean => {
  if (!user) return false;
  if (isAdmin(user)) return true;
  if (user.id === courseCreatorId && isInstructor(user)) return true;
  return false;
};