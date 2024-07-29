import { Rol } from "./Rol";

export class User{
    id : number;
    rol : Rol;
    document : string;
    password : string;
    state : boolean;

    constructor(document?: string, password?: string){
        this.document = document;
        this.password = password;
    }
}