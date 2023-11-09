export interface NewUserFormInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UpdatePasswordFormInterface {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
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

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface VerifyUserRequest {
  emailToken: string;
}

export interface UserDataResponse {
  username: string;
  repetitonsCount: number;
  excercisesCount: number;
}
