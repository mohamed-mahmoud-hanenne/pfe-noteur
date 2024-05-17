import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SericesComponent } from './Components/serices/serices.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { SigninComponent } from './Components/signin/signin.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { DashbordAdminComponent } from './Components/dashbord-admin/dashbord-admin.component';
import { AcheteursComponent } from './Components/acheteurs/acheteurs.component';
import { VendeursComponent } from './Components/vendeurs/vendeurs.component';
import { ActeComponent } from './Components/acte/acte.component';
import { TerrainComponent } from './Components/terrain/terrain.component';
import { AddAcheteurComponent } from './Components/add-acheteur/add-acheteur.component';
import { AcheteurDetailComponent } from './Components/acheteur-detail/acheteur-detail.component';
import { AddVendeurComponent } from './Components/add-vendeur/add-vendeur.component';
import { VendeurDetailComponent } from './Components/vendeur-detail/vendeur-detail.component';
import { AddTerrainComponent } from './Components/add-terrain/add-terrain.component';
import { TerrainDetailComponent } from './Components/terrain-detail/terrain-detail.component';
import { AddActeComponent } from './Components/add-acte/add-acte.component';

const routes: Routes = [
  // {path:'',redirectTo:'/home', pathMatch:'full'},
  // {path:'home',component:HomeComponent,title:'Home'},
  // {path:'services',component:SericesComponent,title:'Services'},
  // {path:'about',component:AboutComponent,title:'About'},
  // {path:'contact',component:ContactComponent,title:'Contact'},
  // {path:'signin',component:SigninComponent,title:'Sign In'},
  // {path:'login',component:LoginComponent,title:'Login'},

  {path:'dashbord',component:DashbordAdminComponent,title:'Dashbord'},
  {path:'acheteurs',component:AcheteursComponent,title:'Acheteurs'},
  {path:'vendeurs',component:VendeursComponent,title:'Vendeurs'},
  {path:'terrain',component:TerrainComponent,title:'Terrain'},
  {path:'acte',component:ActeComponent,title:'Acte'},
  {path:'add-acheteur',component:AddAcheteurComponent,title:'Ajouter-acheteur'},
  {path:'acheteur-detail/:id',component:AcheteurDetailComponent,title:'Modifier-acheteur'},
  {path:'add-vendeur',component:AddVendeurComponent,title:'Ajouter-vendeur'},
  {path:'vendeur-detail/:id',component:VendeurDetailComponent,title:'Modifier-vendeur'},
  {path:'add-terrain',component:AddTerrainComponent,title:'Ajouter-terrain'},
  {path:'terrain-detail/:id',component:TerrainDetailComponent,title:'Modifier-terrain'},
  {path:'add-acte',component:AddActeComponent,title:'Ajouter-acte'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
