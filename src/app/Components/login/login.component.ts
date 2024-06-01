import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/Models/admin';
import { UserLogin } from 'src/app/Models/user-login';
import { NoteurService } from 'src/app/service/noteur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  user:UserLogin = {email:'', password:''};

  constructor(private noteurservice: NoteurService, private router:Router){}
 
  ngOnInit(): void {

  }

  login(){
    this.noteurservice.login(this.user).subscribe(res=>{
      Swal.fire({
        title: 'Success login!',
        text: 'Bienvenue dans votre dashboard!',
        icon: 'success'
      }).then(() => {
        this.router.navigateByUrl('/dashboard');
      });
    },
    error => {
      Swal.fire({
        title: 'Error!',
        text: 'Login failed!',
        icon: 'error'
      });
    }
  )
  }

 
}
