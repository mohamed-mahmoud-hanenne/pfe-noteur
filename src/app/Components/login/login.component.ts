import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/Models/admin';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  constructor(private noteurservice: NoteurService){}
 
  ngOnInit(): void {
  
  }

 
}
