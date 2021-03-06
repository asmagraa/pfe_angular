import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
 
import{ Router } from '@angular/router';
import jwt_decode from 'jwt-decode'; //utiliser avec logout
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token:any;
  userData:any;
  email:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.email = this.userData.email;
    console.log(this.token);
    console.log(this.userData.email);
  }

  logout(){
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); //apres la dcnx il y a une redirection vers login
  }

}
