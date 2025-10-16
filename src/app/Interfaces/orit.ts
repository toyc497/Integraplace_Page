import { Item } from "./item";

export interface Orit {
    id: number;
    code: string;
    unit_price: number;
    discount: number;
    quantity: number;
    itemFather: Item
}
