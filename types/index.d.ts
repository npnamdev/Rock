
interface User {
    _id: string;
    username: string;
    email: string;
    role: {
        name: string;
    };
    isActive: Boolean;
    createdAt: string;
}

interface Permissions {
    getUsers: boolean;
    getUserById: boolean;
    createUser: boolean;
    updateUser: boolean;
    deleteUser: boolean;
    getRoles: boolean;
    getRoleById: boolean;
    createRole: boolean;
    updateRole: boolean;
    deleteRole: boolean;
  }
  
  interface Role {
    permissions: Permissions;
    _id: string;
    name: string;
    createdAt: string; 
    updatedAt: string; 
    __v: number;
    description?: string;
  }
  interface Tags {
    _id: string;
    name: string;
    description?: string;
  }