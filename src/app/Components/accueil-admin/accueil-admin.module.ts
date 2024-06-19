import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { AccueilAdminComponent } from './accueil-admin.component';



@NgModule({
  declarations: [AccueilAdminComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component:  AccueilAdminComponent}
    ])
  ]
})
export class AccueilAdminModule {}
