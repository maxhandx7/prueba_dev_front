//Type
/*
Define la estructura de los datos de producto
*/

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
}