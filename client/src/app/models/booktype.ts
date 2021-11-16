export interface Book {
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

export interface ImageURL {
  image: string;
}