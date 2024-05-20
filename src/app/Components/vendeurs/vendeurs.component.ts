import { Component, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';

@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.scss']
})
export class VendeursComponent implements OnInit{
  searchText: string = '';
  vendeurs: Acheteur[] = [];
  filteredVendeurs : Acheteur[] = [];
  noResultat:boolean = false;

  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getVendeurs().subscribe(v=>{
      this.vendeurs = v;
      this.filteredVendeurs = v;
    },
    error =>{
      console.log('Il ya un erreur', error);
    }
  );
  }

  search():void{
    const searchValue = this.searchText.toLowerCase();
    this.filteredVendeurs = this.vendeurs.filter(vendeur=>
      vendeur.NNI.toString().includes(searchValue)
    );
    this.noResultat = this.filteredVendeurs.length ===0;
    this.searchText = '';
  }
  

  deleteVendeur(id:number,i:any){
    this.noteurservice.deleteVendeur(id).subscribe(res=>{
      this.vendeurs.splice(i,1)
    })
  }
}
