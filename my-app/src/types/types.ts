export interface AuthState {
    user: any;
    token: any;
    accessToken: any;
    refreshToken: any;
    error: any;
  }

  export interface PostState{
    posts: [],
    isLoading: false,
    error: null,
  }

  export interface UserState{
    user: null,
    token: null,
    error: null,
  }

  
  
  export interface RootState {
    auth: AuthState;
    post: PostState;
    user: UserState;
  }