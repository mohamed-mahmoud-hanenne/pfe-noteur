import { Component, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Terrain } from 'src/app/Models/terrain';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent implements OnInit{
  searchText: string = '';
  terrains: Terrain[] = [];
  filtredTerrains: Terrain[] = [];
  noResultat:boolean = false;


  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getTerrains().subscribe(t=>{
      this.terrains = t;
      this.filtredTerrains = t;
    },
    error =>{
      console.log("Il y'a un erreur: ",error)
    }
  );
  }

  search(): void{
    const searchValue = this.searchText.toLowerCase();
    this.filtredTerrains = this.terrains.filter(terrain=>
      terrain.Identifiant_terrain.toLowerCase().includes(searchValue)
    );
    this.searchText = '';
    this.noResultat = this.filtredTerrains.length === 0;
  }

  deleteTerrain(id:number,i:any){
    this.noteurservice.deleteterrain(id).subscribe(res=>{
      this.terrains.splice(i,1);
    })
  }

}
