export interface Product {
    id: number;
    imageURL: string;
    name: string;
    type: string;
    price: number;
    currency: string;
    color: string;
    gender: string;
    quantity: number;
    cartAddedQuantity?: number | any;
}