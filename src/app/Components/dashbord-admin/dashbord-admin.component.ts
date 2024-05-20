import { Component, OnInit } from '@angular/core';
import { Acheteur } from 'src/app/Models/acheteur';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-dashbord-admin',
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.scss']
})
export class DashbordAdminComponent implements OnInit{
  acheteurs: Acheteur[] = [];
  searchText: string = '';
  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getAcheteurs().subscribe(a=>{
      this.acheteurs = a;
      // console.log(this.acheteurs)
    });
  }

  filteredAcheteur: Acheteur[] = [];

  search(): void {
    const searchValue = this.searchText.toLowerCase();
    this.filteredAcheteur = this.acheteurs.filter(acheteur =>
      acheteur.NNI.toString().includes(searchValue)
    );
  }
}
