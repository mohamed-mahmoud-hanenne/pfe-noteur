import { Component, OnInit , NgZone} from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.scss']
})
export class VendeursComponent implements OnInit{
  searchText: string = '';
  vendeurs: Acheteur[] = [];
  filteredVendeurs : Acheteur[] = [];
  noResultat:boolean = false;

  vendeurForm : FormGroup = new FormGroup({});
  // updateVendeurForm : FormGroup = new FormGroup({})

  constructor(
    private fb:FormBuilder,
    private noteurservice:NoteurService,
  ){
    this.vendeurForm = this.fb.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      date_naissance:['',Validators.required],
      adresse:['',Validators.required],
      NNI:['',[Validators.required,Validators.maxLength(10)]],
      numero_tel: ['', [Validators.required, Validators.maxLength(8)]],
      email: ['', Validators.email],
    });

    // this.updateVendeurForm = this.fb.group({
    //   nom: ['', Validators.required],
    //   prenom: ['', Validators.required],
    //   date_naissance: ['', Validators.required],
    //   adresse: ['', Validators.required],
    //   NNI: ['', [Validators.required, Validators.maxLength(10)]],
    //   numero_tel: ['', [Validators.required, Validators.maxLength(8)]],
    //   email: ['', Validators.email],
    // });
  }


  addVendeur() {
    if (this.vendeurForm.valid) {
      this.noteurservice.addVendeur(this.vendeurForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Success',
            text: 'Vendeur ajouté avec succès',
            icon: 'success'
          }).then(() => {
            this.reloadVendeurs(); 
          });
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Ajout a échoué!',
            icon: 'error'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Formulaire invalide!',
        icon: 'error'
      });
    }
  }

  updateVendeur(id: number, data: any) {
    this.noteurservice.updateVendeur(data, id).subscribe(
      () => {
        Swal.fire({
          title: 'Success',
          text: 'Vendeur modifié avec succès',
          icon: 'success'
        }).then(() => {
          this.reloadVendeurs();
        });
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'La modification a échoué!',
          icon: 'error'
        });
      }
    );
  }

  reloadVendeurs() {
    this.noteurservice.getVendeurs().subscribe(
      vendeurs => {
        this.vendeurs = vendeurs;
        this.filteredVendeurs = vendeurs;
      },
      error => {
        console.error('Il ya un erreur!', error);
      }
    );
  }

  openFormAlert() {
    Swal.fire({
      title: 'Ajouter Vendeur',
      html: `
      <button id="closeButton" type="button" class="close" style="position: absolute; top: 10px; right: 10px; font-size: 24px; border: none; background: none; cursor: pointer;">&times;</button>
        <form id="vendeurForm">
          <div class="form-group p-2 mb-3">
            <label for="nom" class="text-start">Nom</label>
            <input id="nom" name="nom" type="text" class="form-control" />
            <span id="nomError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="prenom" class="text-start">Prenom</label>
            <input id="prenom" name="prenom" type="text" class="form-control" />
            <span id="prenomError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="date_naissance" class="text-start">Date de naissance</label>
            <input id="date_naissance" name="date_naissance" type="date" class="form-control" />
            <span id="date_naissanceError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="adresse" class="text-start">Adresse</label>
            <input id="adresse" name="adresse" type="text" class="form-control" />
            <span id="adresseError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="NNI" class="text-start">NNI</label>
            <input id="NNI" name="NNI" type="text" class="form-control" />
            <span id="NNIError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="numero_tel" class="text-start">Téléphone</label>
            <input id="numero_tel" name="numero_tel" type="tel" class="form-control" />
            <span id="numero_telError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="email" class="text-start">Email</label>
            <input id="email" name="email" type="email" class="form-control" />
            <span id="emailError" class="text-danger"></span>
          </div>
        </form>
      `,
      focusConfirm: false,
      customClass: 'swal2-wide',
      confirmButtonText: 'Ajouter',
      didOpen: () => {
        const closeButton = document.getElementById('closeButton');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            Swal.close();
          });
        }
      },
      preConfirm: () => {
        const form = document.getElementById('vendeurForm') as HTMLFormElement;
        const formData = new FormData(form);
        return {
          nom: formData.get('nom') as string,
          prenom: formData.get('prenom') as string,
          date_naissance: formData.get('date_naissance') as string,
          adresse: formData.get('adresse') as string,
          NNI: formData.get('NNI') as string,
          numero_tel: formData.get('numero_tel') as string,
          email: formData.get('email') as string
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.vendeurForm.patchValue(result.value);
        
       
        if (this.vendeurForm.valid) {
          this.addVendeur();
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Formulaire invalide!',
            icon: 'error'
          });
        }
      }
    });
  }

  openUpdateAlert(vendeur: Acheteur) {
    Swal.fire({
      title: 'Modifier Vendeur',
      html: `
        <form id="updateForm">
          <div class="form-group p-2 mb-3">
            <label for="nom" class="text-start">Nom</label>
            <input id="nom" name="nom" type="text" class="form-control" value="${vendeur.nom}" />
            <span id="nomError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="prenom" class="text-start">Prenom</label>
            <input id="prenom" name="prenom" type="text" class="form-control" value="${vendeur.prenom}" />
            <span id="prenomError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="date_naissance" class="text-start">Date de naissance</label>
            <input id="date_naissance" name="date_naissance" type="date" class="form-control" value="${vendeur.date_naissance}" />
            <span id="date_naissanceError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="adresse" class="text-start">Adresse</label>
            <input id="adresse" name="adresse" type="text" class="form-control" value="${vendeur.adresse}" />
            <span id="adresseError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="NNI" class="text-start">NNI</label>
            <input id="NNI" name="NNI" type="text" class="form-control" value="${vendeur.NNI}" />
            <span id="NNIError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="numero_tel" class="text-start">Téléphone</label>
            <input id="numero_tel" name="numero_tel" type="tel" class="form-control" value="${vendeur.numero_tel}" />
            <span id="numero_telError" class="text-danger"></span>
          </div>
          <div class="form-group p-2 mb-3">
            <label for="email" class="text-start">Email</label>
            <input id="email" name="email" type="email" class="form-control" value="${vendeur.email}" />
            <span id="emailError" class="text-danger"></span>
          </div>
        </form>
      `,
      focusConfirm: false,
      customClass: 'swal2-wide',
      showCancelButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Annuler',
      didOpen: () => {
        const updateForm = document.getElementById('updateForm') as HTMLFormElement;
        const confirmButton = Swal.getConfirmButton();
  
        if (confirmButton) {
          confirmButton.addEventListener('click', () => {
            const formData = new FormData(updateForm);
            this.updateVendeur(vendeur.id, {
              nom: formData.get('nom') as string,
              prenom: formData.get('prenom') as string,
              date_naissance: formData.get('date_naissance') as string,
              adresse: formData.get('adresse') as string,
              NNI: formData.get('NNI') as string,
              numero_tel: formData.get('numero_tel') as string,
              email: formData.get('email') as string
            });
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.noteurservice.getVendeurs().subscribe(v=>{
      this.vendeurs = v;
      this.filteredVendeurs = v;
    },
    error =>{
      console.log('Il ya un erreur', error);
    }
  );
  }

  search():void{
    const searchValue = this.searchText.toLowerCase();
    this.filteredVendeurs = this.vendeurs.filter(vendeur=>
      vendeur.NNI.toString().includes(searchValue)
    );
    this.noResultat = this.filteredVendeurs.length ===0;
    this.searchText = '';
  }
  


  deleteVendeur(id: number, i: any): void {
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
        this.noteurservice.deleteVendeur(id).subscribe(res => {
          this.vendeurs.splice(i, 1);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }, error => {
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the file.",
            icon: "error"
          });
          console.error('There was an error!', error);
        });
      }
    });
  }
}
