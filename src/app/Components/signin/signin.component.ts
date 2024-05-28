import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteurService } from 'src/app/service/noteur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{
  signupForm:FormGroup = new FormGroup({});

  constructor(
    private notaireservice:NoteurService,
    private fb: FormBuilder,
    private router:Router
  ){
    this.signupForm = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {
    
  }

  regiter():void{
    if(this.signupForm.valid){
      this.notaireservice.register(this.signupForm.value).subscribe(
        response=>{
          Swal.fire({
            title: 'Success job!',
            text: 'Votre compte est crée avec success!',
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/login']);
          });
         
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Registration failed!',
            icon: 'error'
          });
        }
      );
    } else{
      Swal.fire({
        title: 'Error!',
        text: 'Please fill the form correctly!',
        icon: 'error'
      });
    }
  }

}
