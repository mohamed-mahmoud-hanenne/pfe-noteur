import { Component, OnInit } from '@angular/core';
import { Acte } from 'src/app/Models/acte';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-acte',
  templateUrl: './acte.component.html',
  styleUrls: ['./acte.component.scss']
})
export class ActeComponent implements OnInit{

  actes: Acte[] = [];

  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getActes().subscribe(ac=>{
      this.actes = ac;
    });
  }
}
