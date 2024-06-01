import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private noteurservice: NoteurService,private ngZone:NgZone,private router:Router){}

  ngOnInit(): void {
    this.noteurservice.getAcheteurs().subscribe(a=>{
      this.acheteurs = a;
      // console.log(this.acheteurs)
    });
  }

  navigatetoAcheteurs(){
    this.ngZone.run(()=>this.router.navigateByUrl('/acheteurs'));
  }
  filteredAcheteur: Acheteur[] = [];

  search(): void {
    const searchValue = this.searchText.toLowerCase();
    this.filteredAcheteur = this.acheteurs.filter(acheteur =>
      acheteur.NNI.toString().includes(searchValue)
    );
  }
}
