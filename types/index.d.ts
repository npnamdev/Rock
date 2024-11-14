
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

  interface Tag {
    _id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  

  interface Coupon {
    _id: string;
    code: string;
    courses: string[];  // Mảng ID khóa học nếu có (có thể là mảng string nếu chỉ chứa ID)
    appliesToAllCourses: boolean;
    status: boolean;
    startTime: string;  // Có thể sử dụng Date nếu cần
    endTime: string;  // Có thể sử dụng Date nếu cần
    isUsed: boolean;
    maxUses: number;
    courseAccessDuration: number;
    createdAt: string;  // Có thể sử dụng Date nếu cần
    updatedAt: string;  // Có thể sử dụng Date nếu cần
    __v: number;
  }
  

  interface Popup {
    _id: string;
    title: string;                          // Tiêu đề của popup
    content: string;                        // Nội dung của popup
    size: 'small' | 'medium' | 'large';     // Kích thước popup
    isActive: boolean;                      // Trạng thái hiển thị popup (đang hoạt động hay không)
    startTime: string;                      // Thời gian bắt đầu hiển thị popup (theo định dạng ISO 8601)
    endTime: string;                        // Thời gian kết thúc hiển thị popup (theo định dạng ISO 8601)
    showOnPageLoad: {
      interval: number;                     // Thời gian giữa các lần popup hiển thị (tính bằng mili giây)
      enabled: boolean;                     // Chế độ hiển thị popup khi tải trang
    };
    targetAudience: 'unregistered' | 'registered' | 'all'; // Đối tượng mục tiêu (người dùng đã đăng ký, chưa đăng ký hoặc tất cả)
    createdAt: string;  // Có thể sử dụng Date nếu cần
    updatedAt: string;  // Có thể sử dụng Date nếu cần
    __v: number;
  }

  interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    isActive: boolean;
    slug: string;
    status: "selling" | "out_of_stock"; // Modify according to other status values you might have
    chapters: any[]; // Define a more specific type for chapters if available
    image: string;
    createdAt: string; // or Date, depending on how you want to handle date formats
    updatedAt: string; // or Date, same as above
    __v: number;
  }
  