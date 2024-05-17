import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-vendeur-detail',
  templateUrl: './vendeur-detail.component.html',
  styleUrls: ['./vendeur-detail.component.scss']
})
export class VendeurDetailComponent {
  getId:any;
  updateVendeurForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private activateroute:ActivatedRoute,
    private ngzone:NgZone,
    private noteurservice:NoteurService
  ){
    this.getId = this.activateroute.snapshot.paramMap.get('id');
    this.noteurservice.getVendeurById(this.getId).subscribe(res=>{
      console.log(res['vendeur']);
      this.updateVendeurForm.patchValue({
        nom:res['vendeur']['nom'],
        prenom: res['vendeur']['prenom'],
        date_naissance: res['vendeur']['date_naissance'],
        adresse: res['vendeur']['adresse'],
        NNI: res['vendeur']['NNI'],
        numero_tel: res['vendeur']['numero_tel'],
        email: res['vendeur']['email'],
      });

    });

    this.updateVendeurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      adresse: ['', Validators.required],
      NNI: ['', [Validators.required, Validators.maxLength(10)]],
      numero_tel: ['', [Validators.required, Validators.maxLength(8)]],
      email: ['', Validators.email],
    });
  }

  updateVendeur(){
    this.noteurservice.updateVendeur(this.updateVendeurForm.value,this.getId).subscribe(()=>{
      this.ngzone.run(()=>this.router.navigateByUrl('/vendeurs'))
    })
  }

  retourVendeur(){
    this.ngzone.run(()=>this.router.navigateByUrl('/vendeurs'))
  }
}
