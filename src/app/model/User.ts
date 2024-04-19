import { Rol } from "./Rol";

export class User{
    id : number;
    rol : Rol;
    document : string;
    password : string;
    state : boolean;
}