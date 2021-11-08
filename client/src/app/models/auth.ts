export interface Register {
  result: boolean;
  errors: Errors;
}

interface Errors {
  username: string;
  email: string;
  phone: string;
}

export interface Login {
  result: boolean;
  error: string;
  token: Token;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}
