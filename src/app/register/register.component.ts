import { Component, OnInit } from '@angular/core';

import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';

import{ FormBuilder, FormGroup, Validators} from '@angular/forms'; //on travail avec les forms 
import {MustMatch } from '../confirmed.validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any;
  submitted = false;
  data: any; 
  
  constructor(private formBuilder: FormBuilder, private dataService: DataService, 
    private toastr: ToastrService ) {}

  createForm(){
   this.form = this.formBuilder.group({
     name: [null, Validators.required],
     surname: [null, Validators.required], //null parce que il peut prendre n'importe quel valeurs(il y un infinité des noms)
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(6)]],
     confirmPassword: ['', Validators.required]
   }, {
     validator: MustMatch('password', 'confirmPassword')
   });
  }

  ngOnInit(): void {
    this.createForm();
  }
// a getter to get the form
  get f(){
    return this.form.controls;
  }

// si quelqu'un clique sur submit mais le formulaire n'est pas valide
//submit on va définir le btn 
  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
//registerUser is the name of the function in dataservice.ts
    this.dataService.registerUser(this.form.value).subscribe(res => {
      this.data = res;
      //console.log(res);
      // si le form est correct, il va stocker dans la base 
      if(this.data.status === 1){ //data a 1 donc tous va bien
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut: 2000, //2s et apres il va disparaitre
          progressBar: true //i ya progressbar
        });
      }else{
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
      //si submitted est false donc ne va pas stocker dans bd
      this.submitted = false;
      this.form.get('name').reset();
      this.form.get('surname').reset();
      this.form.get('email').reset();
      this.form.get('password').reset();
      this.form.get('confirmPassword').reset();

    });
  }

}
