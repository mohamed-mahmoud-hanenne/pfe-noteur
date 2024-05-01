import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SericesComponent } from './Components/serices/serices.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { SigninComponent } from './Components/signin/signin.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', title:'Home'},
  {path:'services',component:SericesComponent,title:'Services'},
  {path:'about',component:AboutComponent,title:'About'},
  {path:'contact',component:ContactComponent,title:'Contact'},
  {path:'signin',component:SigninComponent,title:'Sign In'},
  {path:'login',component:LoginComponent,title:'Login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }