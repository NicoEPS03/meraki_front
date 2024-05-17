import { City } from "./City";
import { Sport } from "./Sport";

export class Club{
    id : number;
    name :  string;
    description :  string;
    sport : Sport;
    city : City;
    instragramLink : string;
    facebookLink : string;
    twitterLink : string;
    tiktokLink : string;
    youtubeLink : string;
    whatsappLink : string;
    state : boolean
    delegado : string;
    municipio : string;
    logo : string;

    public constructor(id?: number) {
        this.id = id;
    }
    
}