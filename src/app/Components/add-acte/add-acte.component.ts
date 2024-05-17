import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-add-acte',
  templateUrl: './add-acte.component.html',
  styleUrls: ['./add-acte.component.scss']
})
export class AddActeComponent implements OnInit{

  acteForm :FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private noteurservice:NoteurService,
    private ngzone:NgZone,
    private router:Router
  ){}

  ngOnInit(): void {
    this.initialise();
  }

  initialise(){
    this.acteForm = this.fb.group({
      date_transaction:['',Validators.required],
      montant:['',Validators.required],
      nom_temoin:['',Validators.required],
      NNI_temoin:['',[Validators.required, Validators.maxLength(10)]],
      nom_notaire:['',Validators.required],
      NNI_notaire:['',[Validators.required, Validators.maxLength(10)]],
      frais_notaire:['',Validators.required],
      id_acheteur:['',Validators.required],
      id_vendeur:['',Validators.required],
      id_terrain:['',Validators.required]
    });
  }

  addActe(){
    this.noteurservice.addActe(this.acteForm.value).subscribe(()=>{
      console.log("acte ajoute avec succes");
      this.ngzone.run(()=>this.router.navigateByUrl('/acte'))
    })
  }

  retourActe(){
    this.ngzone.run(()=>this.router.navigateByUrl('/acte'))
  }
}
