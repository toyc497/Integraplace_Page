import { System } from "./system.interface";

export interface Edital{
    id: number;
    identifier: string;
    agency: string;
    notice: string;
    batch: string;
    comment: string;
    status: string;
    portal_link: string;
    portal: System;
}