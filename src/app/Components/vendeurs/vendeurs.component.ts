import { Component, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';
import Swal from 'sweetalert2';

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
  

  // deleteVendeur(id:number,i:any){
  //   this.noteurservice.deleteVendeur(id).subscribe(res=>{
  //     this.vendeurs.splice(i,1)
  //   })
  // }

  deleteVendeur(id: number, i: any): void {
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
        this.noteurservice.deleteVendeur(id).subscribe(res => {
          this.vendeurs.splice(i, 1);
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
