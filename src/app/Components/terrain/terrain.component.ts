import { Component } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent {

  vendeurs: Acheteur[] = [];

  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getVendeurs().subscribe(v=>{
      this.vendeurs = v;
  
    });
  }

}
