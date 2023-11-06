export interface NewUserFormInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormInterface {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  email?: string;
  password: string;
  newPassword?: string;
}

export interface SignUpResponse {
  message: string;
  error?: {
    data: {
      message: string;
    };
    status: number;
  };
}

export interface UserDataResponse {
  repetitonsCount: number;
  excercisesCount: number;
}
