export interface User {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: Address;
  photoURL: string;
}

interface Address {
  mainAddress: string;
  district: string;
  province: string;
  postcode: string;
}