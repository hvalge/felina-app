export interface Product {
  ean: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}