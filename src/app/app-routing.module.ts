import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SericesComponent } from './Components/serices/serices.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { SigninComponent } from './Components/signin/signin.component';
import { DashbordAdminComponent } from './Components/dashbord-admin/dashbord-admin.component';
import { AuthGuard } from './Components/auth.guard';

const routes: Routes = [

  { path: 'dashboard-admin', component: DashbordAdminComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '/', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'services', component: SericesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'signin', component: SigninComponent },
  {
    path: 'dashboard-admin',
    loadChildren: () => import('./Components/dashbord-admin/dashbord-admin.module').then(m => m.DashboardModule),
    // canActivate: [AuthGuard] // Protéger le route
  }
  // Ajoutez d'autres routes comme nécessaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
