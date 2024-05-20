import { Component, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';
@Component({
  selector: 'app-acheteurs',
  templateUrl: './acheteurs.component.html',
  styleUrls: ['./acheteurs.component.scss']
})
export class AcheteursComponent implements OnInit{

  searchText: string = '';
  acheteurs: Acheteur[] = [];
  filteredAcheteurs: Acheteur[] = [];
  noResultat:boolean = false;

  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getAcheteurs().subscribe(
      acheteur => {
        this.acheteurs = acheteur;
        this.filteredAcheteurs = acheteur;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

 

  search(): void {
    const searchValue = this.searchText.toLowerCase();
    this.filteredAcheteurs = this.acheteurs.filter(acheteur =>
      acheteur.NNI.toString().includes(searchValue)
    );
    this.noResultat = this.filteredAcheteurs.length ===0;
    this.searchText = '';
  }

  delete(id:number,i:any){
    // console.log(id);
    this.noteurservice.deleteAcheteur(id).subscribe(res=>{
      this.acheteurs.splice(i,1)
    })
  }
}
