import { Component, OnInit } from '@angular/core';
import { Acheteur } from 'src/app/Models/acheteur';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  data: Acheteur[] = [];

  constructor(private noteurservice: NoteurService) {}

  ngOnInit(): void {
      this.noteurservice.getAcheteurs().subscribe((response) => {
          this.data = response;
          
      });
  }


}
