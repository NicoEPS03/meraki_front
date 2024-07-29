import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const idSession = sessionStorage.getItem('idSession');
    const url = state.url;

    if (isAuthenticated) {
      if (idSession == "1" && url.valueOf() != '/admin/users' && url.valueOf() != '/admin/clubs') {
        this.router.navigate(['/admin/users']);
        return true;
      } else if(idSession == "2" && url.valueOf() != '/admin/club') {
        this.router.navigateByUrl('/admin/club');
        return true;
      }
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
  
}
