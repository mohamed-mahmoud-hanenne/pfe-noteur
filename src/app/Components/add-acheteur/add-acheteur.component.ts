import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-add-acheteur',
  templateUrl: './add-acheteur.component.html',
  styleUrls: ['./add-acheteur.component.scss']
})
export class AddAcheteurComponent implements OnInit{

  acheteurForm: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private noteurservice : NoteurService,
    private ngZone:NgZone,
    private router:Router
  ){}

  ngOnInit(): void {
    this.initialise();
  }

  initialise(){
    this.acheteurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      adress: ['', Validators.required],
      NNI: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.maxLength(8)]],
      email: ['', Validators.email],
    });
  }
  addAcheteur(){
    this.noteurservice.addAcheteur(this.acheteurForm.value).subscribe(()=>{
      console.log("Acheteur ajouté avec success")
      this.ngZone.run(()=>this.router.navigateByUrl('/acheteurs'))
    })
  }
  retourAcheteur(){}
}
