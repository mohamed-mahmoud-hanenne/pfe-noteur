import { Component, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';
@Component({
  selector: 'app-acheteurs',
  templateUrl: './acheteurs.component.html',
  styleUrls: ['./acheteurs.component.scss']
})
export class AcheteursComponent implements OnInit{
  acheteurs: Acheteur[] = [];

  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getAcheteurs().subscribe(a=>{
      this.acheteurs = a;
      // console.log(this.acheteurs)
    });
  }

  delete(id:number,i:any){
    // console.log(id);
    this.noteurservice.deleteAcheteur(id).subscribe(res=>{
      this.acheteurs.splice(i,1)
    })
  }
}
