export interface ProductOrder {
    id: string;
    name: string;
    price: number;
    quantity: number;
    urlImage: string| null;
}

export interface Order {
    userName?: string;
    noTable?: number;
    totalPrice?: number;
    productOrders: ProductOrder[];
}