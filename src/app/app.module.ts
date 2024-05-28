import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { SigninComponent } from './Components/signin/signin.component';
import { LoginComponent } from './Components/login/login.component';
import { SericesComponent } from './Components/serices/serices.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { DashbordAdminComponent } from './Components/dashbord-admin/dashbord-admin.component';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcheteursComponent } from './Components/acheteurs/acheteurs.component';
import { VendeursComponent } from './Components/vendeurs/vendeurs.component';
import { TerrainComponent } from './Components/terrain/terrain.component';
import { ActeComponent } from './Components/acte/acte.component';
import { AddAcheteurComponent } from './Components/add-acheteur/add-acheteur.component';
import { AcheteurDetailComponent } from './Components/acheteur-detail/acheteur-detail.component';
import { AddVendeurComponent } from './Components/add-vendeur/add-vendeur.component';
import { VendeurDetailComponent } from './Components/vendeur-detail/vendeur-detail.component';
import { AddTerrainComponent } from './Components/add-terrain/add-terrain.component';
import { AddActeComponent } from './Components/add-acte/add-acte.component';
import { TerrainDetailComponent } from './Components/terrain-detail/terrain-detail.component';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    SigninComponent,
    LoginComponent,
    SericesComponent,
    DashbordAdminComponent,
    AcheteursComponent,
    VendeursComponent,
    TerrainComponent,
    ActeComponent,
    AddAcheteurComponent,
    AcheteurDetailComponent,
    AddVendeurComponent,
    VendeurDetailComponent,
    AddTerrainComponent,
    AddActeComponent,
    TerrainDetailComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SweetAlert2Module.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
