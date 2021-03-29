import { Component, OnInit } from '@angular/core';

import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';

import{ FormBuilder, FormGroup, Validators} from '@angular/forms'; //on travail avec les forms 

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;
  submitted = false;
  data:any;
  token:any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, 
    private toastr: ToastrService, private router:Router) {}

//create e method //.group because we have multiple fields 
    loginForm(){
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]

      })
    }
  ngOnInit(): void {
    this.loginForm();
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;

    if(this.form.invalid){
      return;
    }

    this.dataService.login(this.form.value).subscribe(res => {
      this.data = res;
     // console.log(res);
     if(this.data.status === 1){
       this.token = this.data.data.token; //take the token from this path
       localStorage.setItem('token', this.token); // on va stocker le token (this.token dans un key of name token) (first 'token' is the name of key )
       //if he is authenticate(everything is ok) we need to route to the login
       this.router.navigate(['/']); //he will navigate to the home page
       this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
       {
        timeOut: 2000,
        progressBar: true
       });  
      } else if(this.data.status === 0) {
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
        {
         timeOut: 2000,
         progressBar: true
        });  
      }
  });
  }
}
