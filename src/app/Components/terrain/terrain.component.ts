import { Component, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Terrain } from 'src/app/Models/terrain';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent implements OnInit{
  searchText: string = '';
  terrains: Terrain[] = [];
  filtredTerrains: Terrain[] = [];
  noResultat:boolean = false;
  
  terrainForm : FormGroup = new FormGroup({});

  constructor(
    private noteurservice: NoteurService,
    private fb:FormBuilder
  ){
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

  addTerrain() {
    if (this.terrainForm.valid) {
      this.noteurservice.addTerrain(this.terrainForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Succès',
            text: 'Terrain a ajouté avec succès',
            icon: 'success'
          }).then(() => {
            this.reloadTerrain(); 
          });
        },
        error => {
          Swal.fire({
            title: 'Erreur!',
            text: 'Ajout a échoué!',
            icon: 'error'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Erreur!',
        text: 'Veuillez remplir correctement le formulaire!',
        icon: 'error'
      });
    }
  }


  updateTerrain(id: number, data: any) {
    this.noteurservice.updateTerrain(data, id).subscribe(
      () => {
        Swal.fire({
          title: 'Succès',
          text: 'Terrain a modifié avec succès',
          icon: 'success'
        }).then(() => {
          this.reloadTerrain();
        });
      },
      error => {
        Swal.fire({
          title: 'Erreur!',
          text: 'La modification a échoué!',
          icon: 'error'
        });
      }
    );
  }


  reloadTerrain() {
    this.noteurservice.getTerrains().subscribe(
      terrains => {
        this.terrains = terrains;
        this.filtredTerrains = terrains;
      },
      error => {
        Swal.fire({
          title: 'Erreur!',
          text: 'Il ya un erreur!',
          icon: 'error'
        });
      }
    );
  }

  

  openFormAlert() {
    Swal.fire({
      title: 'Ajouter Terrain',
      html: `
      <button id="closeButton" type="button" class="close" style="position: absolute; top: 10px; right: 10px; font-size: 24px; border: none; background: none; cursor: pointer;">&times;</button>
        <form id="terrainForm" style="font-size: 0.9rem; padding: 10px; max-height: 400px; overflow-y: auto;">
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="Identifiant_terrain" class="text-start">Identifiant terrain</label>
            <input id="Identifiant_terrain" name="Identifiant_terrain" type="text" class="form-control" />
            <span id="Identifiant_terrainError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="localisation" class="text-start">Localisation</label>
            <input id="localisation" name="localisation" type="text" class="form-control" />
            <span id="localisationError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="superficie" class="text-start">Superficie</label>
            <input id="superficie" name="superficie" type="text" class="form-control" />
            <span id="superficieError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="description" class="text-start">Description</label>
            <input id="description" name="description" type="text" class="form-control" />
            <span id="descriptionError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="proprietaire" class="text-start">Proprietaire</label>
            <input id="proprietaire" name="proprietaire" type="text" class="form-control" />
            <span id="proprietaireError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="coordonnees_gps" class="text-start">Coordonnees gps</label>
            <input id="coordonnees_gps" name="coordonnees_gps" type="text" class="form-control" />
            <span id="coordonnees_gpsError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="prix" class="text-start">Prix</label>
            <input id="prix" name="prix" type="number" class="form-control" />
            <span id="prixError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="statut_juridique" class="text-start">Statut juridique</label>
            <input id="statut_juridique" name="statut_juridique" type="text" class="form-control" />
            <span id="statut_juridiqueError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="date_acquisition" class="text-start">Date acquisition</label>
            <input id="date_acquisition" name="date_acquisition" type="date" class="form-control" />
            <span id="date_acquisitionError" class="text-danger"></span>
          </div>
        </form>
      `,
      focusConfirm: false,
      customClass: 'swal2-wide',
      showCancelButton: false,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      didOpen: () => {
        const closeButton = document.getElementById('closeButton');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            Swal.close();
          });
        }
      },
      preConfirm: () => {
        const form = document.getElementById('terrainForm') as HTMLFormElement;
        const formData = new FormData(form);
        return {
          Identifiant_terrain: formData.get('Identifiant_terrain') as string,
          localisation: formData.get('localisation') as string,
          superficie: formData.get('superficie') as string,
          description: formData.get('description') as string,
          proprietaire: formData.get('proprietaire') as string,
          coordonnees_gps: formData.get('coordonnees_gps') as string,
          prix: formData.get('prix') as string,
          statut_juridique: formData.get('statut_juridique') as string,
          date_acquisition: formData.get('date_acquisition') as string
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.terrainForm.patchValue(result.value);
        if (this.terrainForm.valid) {
          this.addTerrain();
        } else {
          Swal.fire({
            title: 'Erreur!',
            text: 'Veuillez remplir correctement le formulaire!',
            icon: 'error'
          });
        }
      }
    });
  }

  openUpdateAlert(terrain: Terrain) {
    Swal.fire({
      title: 'Modifier Terrain',
      html: `
      <button id="closeButton" type="button" class="close" style="position: absolute; top: 10px; right: 10px; font-size: 24px; border: none; background: none; cursor: pointer;">&times;</button>
        <form id="updateForm" style="font-size: 0.9rem; padding: 10px; max-height: 400px; overflow-y: auto;">
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="Identifiant_terrain" class="text-start">Identifiant Terrain</label>
            <input id="Identifiant_terrain" name="Identifiant_terrain" type="text" class="form-control" value="${terrain.Identifiant_terrain}" />
            <span id="Identifiant_terrainError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="localisation" class="text-start">Localisation</label>
            <input id="localisation" name="localisation" type="text" class="form-control" value="${terrain.localisation}" />
            <span id="localisationError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="superficie" class="text-start">Superficie</label>
            <input id="superficie" name="superficie" type="text" class="form-control" value="${terrain.superficie}" />
            <span id="superficieError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="description" class="text-start">Description</label>
            <input id="description" name="description" type="text" class="form-control" value="${terrain.description}" />
            <span id="descriptionError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="proprietaire" class="text-start">Propriétaire</label>
            <input id="proprietaire" name="proprietaire" type="text" class="form-control" value="${terrain.proprietaire}" />
            <span id="proprietaireError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="coordonnees_gps" class="text-start">Coordonnées GPS</label>
            <input id="coordonnees_gps" name="coordonnees_gps" type="text" class="form-control" value="${terrain.coordonnees_gps}" />
            <span id="coordonnees_gpsError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="prix" class="text-start">Prix</label>
            <input id="prix" name="prix" type="text" class="form-control" value="${terrain.prix}" />
            <span id="prixError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="statut_juridique" class="text-start">Statut Juridique</label>
            <input id="statut_juridique" name="statut_juridique" type="text" class="form-control" value="${terrain.statut_juridique}" />
            <span id="statut_juridiqueError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="date_acquisition" class="text-start">Date d'Acquisition</label>
            <input id="date_acquisition" name="date_acquisition" type="date" class="form-control" value="${terrain.date_acquisition}" />
            <span id="date_acquisitionError" class="text-danger"></span>
          </div>
        </form>
      `,
      focusConfirm: false,
      customClass: 'swal2-wide',
      showCancelButton: false,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Annuler',
      didOpen: () => {
        const closeButton = document.getElementById('closeButton');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            Swal.close();
          });
        }
        const updateForm = document.getElementById('updateForm') as HTMLFormElement;
        const confirmButton = Swal.getConfirmButton();
    
        if (confirmButton) {
          confirmButton.addEventListener('click', () => {
            const formData = new FormData(updateForm);
            this.updateTerrain(terrain.id, {
              Identifiant_terrain: formData.get('Identifiant_terrain') as string,
              localisation: formData.get('localisation') as string,
              superficie: formData.get('superficie') as string,
              description: formData.get('description') as string,
              proprietaire: formData.get('proprietaire') as string,
              coordonnees_gps: formData.get('coordonnees_gps') as string,
              prix: formData.get('prix') as string,
              statut_juridique: formData.get('statut_juridique') as string,
              date_acquisition: formData.get('date_acquisition') as string,
            });
          });
        }
      }
    });
  }
  
  
  ngOnInit(): void {
    this.noteurservice.getTerrains().subscribe(t=>{
      this.terrains = t;
      this.filtredTerrains = t;
    },
    error =>{
      Swal.fire({
        title: 'Erreur!',
        text: 'Il ya un erreur lors de la recuperation!',
        icon: 'error'
      });
    }
  );
  }

  search(): void{
    const searchValue = this.searchText.toLowerCase();
    this.filtredTerrains = this.terrains.filter(terrain=>
      terrain.Identifiant_terrain.toLowerCase().includes(searchValue)
    );
    // this.searchText = '';
    this.noResultat = this.filtredTerrains.length === 0;
  }


  deleteTerrain(id: number, i: any){
    Swal.fire({
      title: "Etes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer",
      cancelButtonText:"Anuller"
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteurservice.deleteterrain(id).subscribe(res => {
          this.terrains.splice(i, 1);
          Swal.fire({
            title: "Succès!",
            text: "Terrain a supprimé avec succès",
            icon: "success"
          });
        }, error => {
          Swal.fire({
            title: "Erreur!",
            text: "La suppression a echoué",
            icon: "error"
          });
          
        });
      }
    });
  }

}
