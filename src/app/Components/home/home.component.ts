import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  users: User[] = [];
  constructor(private userservice: NoteurService){}

  ngOnInit(): void {
    this.getusers();
  }

  getusers(){
    this.userservice.getUsers().subscribe(user=>{
      this.users = user
    })
  }
}
