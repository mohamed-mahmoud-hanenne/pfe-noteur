import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcheteursComponent } from './acheteurs.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importez FormsModule ici


@NgModule({
  declarations: [AcheteursComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: AcheteursComponent }
    ])
  ]
})
export class AcheteursModule { }
