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

export interface CustomerDetails {
    name: string;
    email: string;
    address: string;
}

export interface OrderPayload {
    items: CartItem[];
    customer: CustomerDetails;
}
