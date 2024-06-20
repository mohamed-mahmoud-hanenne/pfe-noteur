import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HomeComponent } from './Components/home/home.component'; // Importez HomeComponent
import { LoginComponent } from './Components/login/login.component'; // Importez LoginComponent
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DashboardAdminRoutingModule } from './Components/dashbord-admin/dashboard-routing.module';
import { DashbordAdminComponent } from './Components/dashbord-admin/dashbord-admin.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SericesComponent } from './Components/serices/serices.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AboutComponent } from './Components/about/about.component';
import { AccueilAdminComponent } from './Components/accueil-admin/accueil-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SigninComponent,
    SericesComponent,
    ContactComponent,
    AboutComponent,
    AccueilAdminComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule, 
    CommonModule,
    SweetAlert2Module.forRoot(),
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
