import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteurService } from 'src/app/service/noteur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vendeur',
  templateUrl: './add-vendeur.component.html',
  styleUrls: ['./add-vendeur.component.scss']
})
export class AddVendeurComponent implements OnInit{

  vendeurForm : FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private noteurservice:NoteurService,
    private ngZone:NgZone
  ){}

  ngOnInit(): void {
    this.initialise();
  }

  initialise(){
    this.vendeurForm = this.fb.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      date_naissance:['',Validators.required],
      adresse:['',Validators.required],
      NNI:['',[Validators.required,Validators.maxLength(10)]],
      numero_tel: ['', [Validators.required, Validators.maxLength(8)]],
      email: ['', Validators.email],
    })
  }

  // addVendeur(){
  //   this.noteurservice.addVendeur(this.vendeurForm.value).subscribe(()=>{
  //     console.log("Acheteur ajouté avec success");
  //     this.ngZone.run(()=>this.router.navigateByUrl('/vendeurs'));
  //   })
  // }

  addVendeur(){
    this.noteurservice.addVendeur(this.vendeurForm.value).subscribe(()=>{
      Swal.fire({
        title: 'Success',
        text: 'Vendeur ajouté avec success',
        icon: 'success'
      }).then(() => {
        this.ngZone.run(()=>this.router.navigateByUrl('/vendeurs'))
      });
    },
    error => {
      Swal.fire({
        title: 'Error!',
        text: 'Ajout a echoué!',
        icon: 'error'
      });
    }
      
  )
  }

  retourAcheteur(){
    this.ngZone.run(()=>this.router.navigateByUrl('/vendeurs'))
  }
}
