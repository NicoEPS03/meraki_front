import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from 'src/app/model/Rol';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.css']
})
export class InsertUserComponent implements OnInit {
  form: FormGroup;
  private id: number;
  private edicion: boolean;
  rol: String;  
  hide = true;

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });
    this.inicializarFormularioVacio();
    if (this.edicion == true) {
      this.cargarDatos();
    }
  }

  inicializarFormularioVacio() {
    if (this.edicion == true) {
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'document': new FormControl(0, [Validators.required]),
        'password': new FormControl('', [Validators.required]),
      });
    }else{
      this.form = new FormGroup({
        'id': new FormControl(0, [Validators.required]),
        'document': new FormControl(0, [Validators.required]),
        'password': new FormControl('', [Validators.required]),
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Información', {
      duration: 2000,
    });
  }

  guardar(){
    let user = new User();
    user.document = this.form.value['document'];
    user.password = this.form.value['password'];
    user.rol = new Rol(2);
    if(this.edicion === true) {
      user.id = this.id;
      this.userService.editUser(user).subscribe(() => {
        this.form.reset();
        this.openSnackBar('Usuario editado satisfactoreamente');
        this.router.navigate(['/admin/user']);
      });
    }else{
      this.userService.insertUser(user).subscribe(() => {
        this.form.reset();
        this.userService.mensajeCambio.next('Usuario guadado satisfactoreamente');
        this.router.navigate(['/admin/user']);
      });
    }
  }

  cargarDatos() {
    this.userService.getUser(this.id).subscribe(data =>{
        this.form.get("document").setValue(data.document);
        this.form.get("password").setValue(data.password);
        this.rol = data.rol.description;
    });
  }
}
