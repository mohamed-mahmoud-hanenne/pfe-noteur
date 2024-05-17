import { Component, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Terrain } from 'src/app/Models/terrain';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent implements OnInit{

  terrains: Terrain[] = [];

  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getTerrains().subscribe(t=>{
      this.terrains = t;
  
    });
  }

  deleteTerrain(id:number,i:any){
    this.noteurservice.deleteterrain(id).subscribe(res=>{
      this.terrains.splice(i,1);
    })
  }

}
