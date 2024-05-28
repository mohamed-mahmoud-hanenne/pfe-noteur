import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Acheteur } from 'src/app/Models/acheteur';
import { Terrain } from 'src/app/Models/terrain';
import { NoteurService } from 'src/app/service/noteur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-acte',
  templateUrl: './add-acte.component.html',
  styleUrls: ['./add-acte.component.scss']
})
export class AddActeComponent implements OnInit{

  acteForm :FormGroup = new FormGroup({});
  acheteursinacte : Acheteur[] = [];
  vendeursinacte : Acheteur[] = [];
  terrainsinacte : Terrain[] = [];

  constructor(
    private fb:FormBuilder,
    private noteurservice:NoteurService,
    private ngzone:NgZone,
    private router:Router
  ){}



  ngOnInit(): void {
    this.initialise();
    this.noteurservice.getAcheteurs().subscribe(ach=>{
      this.acheteursinacte = ach;
    });
    this.noteurservice.getVendeurs().subscribe(vend=>{
      this.vendeursinacte = vend;
    });
    this.noteurservice.getTerrains().subscribe(terr=>{
      this.terrainsinacte = terr;
    });
  }

  initialise(){
    this.acteForm = this.fb.group({
      date_transaction:['',Validators.required],
      montant:['',Validators.required],
      nom_temoin:['',Validators.required],
      NNI_temoin: ['', [Validators.required, Validators.maxLength(10)]],
      nom_notaire:['',Validators.required],
      NNI_notaire:['',[Validators.required, Validators.maxLength(10)]],
      frais_notaire:['',Validators.required],
      id_acheteur:['',Validators.required],
      id_vendeur:['',Validators.required],
      id_terrain:['',Validators.required]
    });
  }

  // addActe(){
  //   this.noteurservice.addActe(this.acteForm.value).subscribe(()=>{
  //     console.log("acte ajoute avec succes");
  //     this.ngzone.run(()=>this.router.navigateByUrl('/acte'))
  //   })
  // }

  addActe(){
    this.noteurservice.addActe(this.acteForm.value).subscribe(()=>{
      Swal.fire({
        title: 'Success',
        text: 'Acte ajouté avec success',
        icon: 'success'
      }).then(() => {
        this.ngzone.run(()=>this.router.navigateByUrl('/acte'))
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

  retourActe(){
    this.ngzone.run(()=>this.router.navigateByUrl('/acte'))
  }
}
