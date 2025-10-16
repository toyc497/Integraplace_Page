import { ItemOrderForm } from "./item-order-form";

export interface OrderForm {
    bpr1Client: string;
    items_collection: ItemOrderForm[];
}
