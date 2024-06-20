import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordAdminComponent } from './dashbord-admin.component';
import { DashboardAdminRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [DashbordAdminComponent],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule
  ]
})
export class DashboardModule {}
