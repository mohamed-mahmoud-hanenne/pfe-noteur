import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TerrainComponent } from './terrain.component';


@NgModule({
  declarations: [TerrainComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: TerrainComponent }
    ])
  ]
})
export class TerrainsModule { }
