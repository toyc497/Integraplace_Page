import { Orit } from "./orit";
import { Partner } from "./partner.interface";

export interface Order {
    id: number;
    code: string;
    status: string;
    data_doc: string;
    totalprice: number;
    bpr1Client: Partner;
}
