export interface Carts {
  _id: string;
  quantity: number;
  product: Product;
  totalPrice: number;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  categories: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}