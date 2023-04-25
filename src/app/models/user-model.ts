import { AddressModel } from "./address.model";

export class UserModel {
    id?: number;
    name?: string;
    email?: string;
    birthday?: string;
    phone?: string;
    perfis?: string[]
    address?: AddressModel
}
