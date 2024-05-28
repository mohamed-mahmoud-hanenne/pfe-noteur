import { Component, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Terrain } from 'src/app/Models/terrain';
import Swal from 'sweetalert2';

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

  // deleteTerrain(id:number,i:any){
  //   this.noteurservice.deleteterrain(id).subscribe(res=>{
  //     this.terrains.splice(i,1);
  //   })
  // }

  deleteTerrain(id: number, i: any){
    Swal.fire({
      title: "Etes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer",
      cancelButtonText:"Anuller"
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteurservice.deleteterrain(id).subscribe(res => {
          this.terrains.splice(i, 1);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }, error => {
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the file.",
            icon: "error"
          });
          console.error('There was an error!', error);
        });
      }
    });
  }

}
