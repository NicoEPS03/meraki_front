import { Athlete } from "./Athlete";
import { DocumentType } from "./DocumentType";

export class Family{
    id : number;
    athlete : Athlete;
    name : string;
    document : string;
    documentType : DocumentType;
    phone : string;
    email : string;
    company : string;
    occupation : string;
    relationship : string;
    state : boolean;
}