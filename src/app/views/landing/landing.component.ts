import { Component, OnInit } from "@angular/core";
import { GeneralService } from '../../service/general.service';
import { Sport } from "src/app/model/Sport";
import { City } from "src/app/model/City";
import { Club } from "src/app/model/Club";
import { ClubService } from "../../service/club.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private generalService: GeneralService,
              private clubService: ClubService) { }
  sports: Sport[] = [];
  cities: City[] = [];
  clubs: Club[] = [];
  selected = false;
  idSport = 0;

  ngOnInit(): void {
    this.generalService.getSports().subscribe(data => {
      this.sports = data;
    });
  }

  citiesSport(id) {
    this.idSport = id;
    this.generalService.getCitiesSports(id).subscribe(data => {
      this.cities = data;
    });
  }

  clubCities(city) {
    this.clubService.getPageFilterSportAndCity(0, 4, this.idSport, city.value).subscribe(data => {
      this.clubs = data.content;
      console.log(data.content);
    });    
  }
}
