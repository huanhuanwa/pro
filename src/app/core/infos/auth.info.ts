export interface User {
    [propName: string]: any;
    id: number | string | null;
    name?: string;
    email?: string;
    avatar?: string;
  }
  
  export interface AccessToken {
    access_token?: string;
    token?: string;
    token_type?: string;
    expires_in?: number;
  }
  
  export interface RefreshToken {
    refresh: boolean;
    accessToken: string;
    tokenType: string;
    exp: number;
  
    refreshTime: () => number;
    valid: () => boolean;
  }

  export type LoginParamsType = {
    username: string;
    password: string;
  };
  