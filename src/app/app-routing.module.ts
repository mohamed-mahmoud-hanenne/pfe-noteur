import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
 // Importez l'AuthGuard

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
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
