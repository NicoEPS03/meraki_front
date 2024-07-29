import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/model/User";
import { GeneralService } from "src/app/service/general.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit() {  
    this.inicializarFormularioVacio();
  }

  inicializarFormularioVacio() {
    this.form = new FormGroup({
      'document': new FormControl(0, [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  async login(){
    let user = new User();
    user.document = this.form.value['document'];
    user.password = this.form.value['password'];

    const data = await this.generalService.login(user).toPromise();
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('idSession', data.rol.id.toString());
    if(data.rol.id.toString() == "1"){
      this.router.navigate(['/admin/users']);
    } else if (data.rol.id.toString() == "2"){
      sessionStorage.setItem('id', data.id.toString());
      this.router.navigate(['/admin/club']);
    }
    
  }
}
