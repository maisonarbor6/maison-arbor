import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    priceCents: bigint;
}
export enum Category {
    LivingRoom = "LivingRoom",
    Outdoor = "Outdoor",
    Dining = "Dining",
    Bedroom = "Bedroom"
}
export interface backendInterface {
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    init(): Promise<void>;
    removeFromCart(productId: bigint): Promise<void>;
}
