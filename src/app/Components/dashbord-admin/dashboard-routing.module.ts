import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordAdminComponent } from './dashbord-admin.component';


const routes: Routes = [
  {
    path: '',
    component: DashbordAdminComponent,
    children: [
      { path: 'accueil-admin', loadChildren: () => import('../accueil-admin/accueil-admin.module').then(m => m.AccueilAdminModule) },
      { path: 'acheteurs', loadChildren: () => import('../acheteurs/acheteurs.module').then(m => m.AcheteursModule) },
      { path: 'vendeurs', loadChildren: () => import('../vendeurs/vendeurs.module').then(m => m.VendeursModule) },
      { path: 'terrains', loadChildren: () => import('../terrain/terrains.module').then(m => m.TerrainsModule) },
      { path: 'acte', loadChildren: () => import('../acte/acte.module').then(m => m.ActeModule) },
      { path: 'procuration-enfant', loadChildren: () => import('../procuration/procuration.module').then(m => m.ProcurationModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdminRoutingModule { }
