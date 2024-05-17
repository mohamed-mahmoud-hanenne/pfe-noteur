import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-add-terrain',
  templateUrl: './add-terrain.component.html',
  styleUrls: ['./add-terrain.component.scss']
})
export class AddTerrainComponent implements OnInit{
  terrainForm : FormGroup = new FormGroup({});

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
    this.terrainForm = this.fb.group({
      Identifiant_terrain:['',Validators.required],
      localisation:['',Validators.required],
      superficie:['',Validators.required],
      description:['',Validators.required],
      proprietaire:['',Validators.required],
      coordonnees_gps:['',Validators.required],
      prix:['',Validators.required],
      statut_juridique:['',Validators.required],
      date_acquisition:['',Validators.required]
    });

    

    

  }

  addTerrain(){
    this.noteurservice.addTerrain(this.terrainForm.value).subscribe(()=>{
      console.log("Terrain ajouté avec succés");
      this.ngzone.run(()=>this.router.navigateByUrl('/terrain'));
    });
  }


  retourTerrain(){
    this.ngzone.run(()=>this.router.navigateByUrl('/terrain'));
  }
}
