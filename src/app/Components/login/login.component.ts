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

  login() {
    this.noteurservice.login(this.user).subscribe(res => {
      this.noteurservice.setLoggedIn(true);
      localStorage.setItem('token', res.token); // Store token in localStorage
      this.router.navigate(['/dashboard-admin']);
    },
    error => {
      Swal.fire({
        title: 'Connexion échouée!',
        text: 'Email ou mot de passe incorrect!',
        icon: 'error'
      });
    });
  }

 
}
