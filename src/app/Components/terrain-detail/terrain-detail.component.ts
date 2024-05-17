import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteurService } from 'src/app/service/noteur.service';

@Component({
  selector: 'app-terrain-detail',
  templateUrl: './terrain-detail.component.html',
  styleUrls: ['./terrain-detail.component.scss']
})
export class TerrainDetailComponent implements OnInit{
  getId:any;
  terrainFormUpdate:FormGroup;
  
  ngOnInit(): void {
    
  }

  constructor(
    private fb:FormBuilder,
    private noteurservice:NoteurService,
    private ngzone:NgZone,
    private router:Router,
    private activatedroute:ActivatedRoute
  ){
    this.getId = this.activatedroute.snapshot.paramMap.get('id');
    this.noteurservice.getTerrainbyId(this.getId).subscribe(res=>{
      this.terrainFormUpdate.patchValue({
        Identifiant_terrain: res['terrain']['Identifiant_terrain'],
        localisation: res['terrain']['localisation'],
        superficie: res['terrain']['superficie'],
        description: res['terrain']['description'],
        proprietaire: res['terrain']['proprietaire'],
        coordonnees_gps: res['terrain']['coordonnees_gps'],
        prix: res['terrain']['prix'],
        statut_juridique: res['terrain']['statut_juridique'],
        date_acquisition: res['terrain']['date_acquisition'],
      });
    });

    this.terrainFormUpdate = this.fb.group({
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

  updateTerrain(){
    this.noteurservice.updateTerrain(this.terrainFormUpdate.value,this.getId).subscribe(()=>{
      this.ngzone.run(()=>this.router.navigateByUrl('/terrain'))
    });
  }

  retourTerrain(){
    this.ngzone.run(()=>this.router.navigateByUrl('/terrain'));
  }
}
