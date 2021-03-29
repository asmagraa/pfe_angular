//on l'utilise pour stocker le token dans un local storage 
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor(private router:Router){

    }
    token:any;
    //methode de verification (si le token est egale a token de local storage donc on prend le clé)
    canActivate():any {
        this.token = localStorage.getItem('token');
        if(this.token){
            return true;
        } else{
            this.router.navigate(['login']); //si le token est fausse navigate to the login page
        }
    }
}