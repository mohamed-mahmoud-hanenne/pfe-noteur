import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VendeursComponent } from './vendeurs.component';


@NgModule({
  declarations: [VendeursComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: VendeursComponent }
    ])
  ]
})
export class VendeursModule { }
