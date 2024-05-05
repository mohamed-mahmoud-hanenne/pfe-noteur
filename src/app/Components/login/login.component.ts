import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/Models/admin';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  hide = true;
  email : string = '';
  password : string = '';
  admins: Admin[] = [];

  constructor(private noteurservice: NoteurService){}
 
  ngOnInit(): void {
    this.login();
  }

  login(){
    return this.noteurservice.getAdmin().subscribe(admin=>{
      this.admins = admin;
      console.log(this.admins);
    });
  }
}
