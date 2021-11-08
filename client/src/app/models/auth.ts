
export interface Register {
  result: boolean;
  errors: Errors;
}

interface Errors {
  username: string;
  email: string;
  phone: string;
}