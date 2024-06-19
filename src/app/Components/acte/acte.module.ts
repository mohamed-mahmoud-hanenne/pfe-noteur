import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActeComponent } from './acte.component';



@NgModule({
  declarations: [ActeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ActeComponent }
    ])
  ]
})
export class ActeModule { }
