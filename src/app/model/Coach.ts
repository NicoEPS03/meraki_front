import { Club } from "./Club";
import { DocumentType } from "./DocumentType";
import { User } from "./User";

export class Coach{
    id : number;
    user : User;
    club : Club;
    name : string;
    lastName : string;
    documentType : DocumentType;
}