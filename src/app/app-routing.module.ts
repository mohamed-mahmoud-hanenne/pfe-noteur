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
  {path:'vendeurs',component:VendeursComponent,title:'vendeurs'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
