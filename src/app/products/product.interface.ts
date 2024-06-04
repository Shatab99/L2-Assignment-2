export type TVariant = {
    type: string;
    value: string;
}

export type Inventory ={
    quantity : number;
    inStock : boolean;
} 

export type Products = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: TVariant[];
    inventory: Inventory;
}