interface Role {
    name: string;
    permissions: { permission: string }[];
  }
  
  interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
  }
  
  export interface Auth {
    user: User;
    accessToken: string;
    accessTokenDuration: number;
    refreshToken: string;
    refreshTokenDuration: number;
  }
  