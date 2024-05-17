import { City } from "./City";
import { Club } from "./Club";
import { DocumentType } from "./DocumentType"

export class Athlete{
    id : number;
    club : Club;
    name : string;
    lastName : string;
    eps : string;
    bornCity : City;
    bornDate : Date;
    gender : string;
    phone : string;
    direction : string;
    document : string;
    documentType : DocumentType;
    rh : string;
    neighborhood : string;
    email : string;
    schoolGrade : string;
    grade : string;
    institution : string;
    profession : string;
    otherStudy : string;
    disability : boolean;
    disabilityDescription: string;
    disabilityType : string;
    populationType : string;
    otherPopulationType : string;
    nationality : string;
    stratum : string;
    sisben : string;
    uniformSize : string;
    shoeSize : number;
    disease : boolean;
    diseaseDescription : string;

    public constructor(id?: number) {
        this.id = id;
    }
}