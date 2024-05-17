import { Component, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';

@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.scss']
})
export class VendeursComponent implements OnInit{
  vendeurs: Acheteur[] = [];

  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getVendeurs().subscribe(v=>{
      this.vendeurs = v;
    });
  }

  deleteVendeur(id:number,i:any){
    this.noteurservice.deleteVendeur(id).subscribe(res=>{
      this.vendeurs.splice(i,1)
    })
  }
}
