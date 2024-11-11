
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
    title?: string;
    url?: string;
  }
  interface Tags {
    _id: string;
    name: string;
    description?: string;
  }

  interface Promotion {
    _id: string;
    code: string;
    name: string;
    isActive: boolean;
    usageLimit: number;
    startDate: string; // ISO 8601 date string
    endDate: string; // ISO 8601 date string
    promotionType: "SPECIFIC_COURSES" | "ALL_COURSES" | string; // you can extend this if needed
    discountAmount: number;
    selectedCourses: string[]; // Array of course IDs
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    __v: number;
  }

  interface ImageMetadata {
    size: number;
    format: string;
    width: number;
    height: number;
  }
  
  interface ImageData {
    metadata: ImageMetadata;
    _id: string;
    title: string;
    url: string;
    public_id: string;
    __v: number;
  }