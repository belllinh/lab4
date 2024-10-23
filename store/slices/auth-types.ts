// Định nghĩa các loại role trong hệ thống
export enum UserRole {
    ADMIN = 'ADMIN',
    STAFF = 'STAFF',
    CUSTOMER = 'CUSTOMER',
  }
  
  // Interface cho user có thêm role
  export interface User {
    id: string;
    name: string;
    email: string;
    department?: string;
    role: UserRole;
  }
  
  // Định nghĩa các quyền cho từng chức năng
  export interface Permissions {
    canSelectServices: boolean;
    canMakePayments: boolean;
    canEditUsers: boolean;
    canDeleteUsers: boolean;
  }
  
  // Map role với permissions tương ứng
  export const rolePermissions: Record<UserRole, Permissions> = {
    [UserRole.ADMIN]: {
      canSelectServices: true,
      canMakePayments: true,
      canEditUsers: true,
      canDeleteUsers: true,
    },
    [UserRole.STAFF]: {
      canSelectServices: true,
      canMakePayments: true,
      canEditUsers: false,
      canDeleteUsers: false,
    },
    [UserRole.CUSTOMER]: {
      canSelectServices: true,
      canMakePayments: true,
      canEditUsers: false,
      canDeleteUsers: false,
    },
  }
  
  // Hook để kiểm tra quyền
  export const usePermissions = (userRole: UserRole): Permissions => {
    return rolePermissions[userRole];
  };