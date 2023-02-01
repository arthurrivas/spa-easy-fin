import { AddressModel } from "./address.model";

export class UserModel {
    name?: string;
    email?: string;
    birthday?: string;
    phone?: string;
    perfis?: string[]
    address?: AddressModel
}
