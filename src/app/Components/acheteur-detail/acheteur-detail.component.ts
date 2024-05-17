import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-acheteur-detail',
  templateUrl: './acheteur-detail.component.html',
  styleUrls: ['./acheteur-detail.component.scss']
})
export class AcheteurDetailComponent implements OnInit{
  getId:any;
  updateForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private activateroute:ActivatedRoute,
    private ngZone:NgZone,
    private noteurservice:NoteurService
  ){
    this.getId = this.activateroute.snapshot.paramMap.get('id');
    this.noteurservice.getAcheteurById(this.getId).subscribe(res=>{
      // console.log(res['acheteur']);
      this.updateForm.patchValue({
      nom: res['acheteur']['nom'],
      prenom: res['acheteur']['prenom'],
      date_naissance: res['acheteur']['date_naissance'],
      adresse: res['acheteur']['adresse'],
      NNI: res['acheteur']['NNI'],
      numero_tel: res['acheteur']['numero_tel'],
      email: res['acheteur']['email'],
      });

    });

    this.updateForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      adresse: ['', Validators.required],
      NNI: ['', [Validators.required, Validators.maxLength(10)]],
      numero_tel: ['', [Validators.required, Validators.maxLength(8)]],
      email: ['', Validators.email],
    });

  }

  ngOnInit(): void {
    
  }

  updateAcheteur(){
    this.noteurservice.updateAcheteur(this.updateForm.value,this.getId).subscribe(()=>{
      // console.log("Acheteur modifié avec success")
      this.ngZone.run(()=>this.router.navigateByUrl('/acheteurs'))
    })
  }
  retourAcheteur(){
    this.ngZone.run(()=>this.router.navigateByUrl('/acheteurs'))
  }
}
