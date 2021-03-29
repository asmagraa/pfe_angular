import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes } from '@angular/router';//pour définir les routes (login, register)
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; //toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //animation de toast si l'utilisateur est successfully registered ou nn ... 

import { AuthGuard } from './auth.guard';

const routes:Routes = [ //definir les routes
  {
    path: '', component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register', component:RegisterComponent
  },
  {
    path: 'login', component:LoginComponent
  }
  
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
