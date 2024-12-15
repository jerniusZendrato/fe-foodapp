export interface ProductOrder {
    id: string;
    name: string;
    price: number;
    quantity: number;
    urlImage: string| null;
}

export interface Order {
    userId?: string;
    totalPrice?: number;
    productOrders: ProductOrder[];
}