import { Component, NgZone, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acheteurs',
  templateUrl: './acheteurs.component.html',
  styleUrls: ['./acheteurs.component.scss']
})
export class AcheteursComponent implements OnInit {

  searchText: string = '';
  acheteurs: Acheteur[] = [];
  filteredAcheteurs: Acheteur[] = [];
  noResultat: boolean = false;

  acheteurForm: FormGroup = new FormGroup({});

  constructor(private noteurservice: NoteurService,private fb: FormBuilder, private ngzone:NgZone,
   private router:Router
  ) {
    this.acheteurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      adresse: ['', Validators.required],
      NNI: ['', [Validators.required, Validators.maxLength(10)]],
      numero_tel: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }


  addAcheteur() {
    if (this.acheteurForm.valid) {
      this.noteurservice.addAcheteur(this.acheteurForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Success',
            text: 'Acheteur ajouté avec succès',
            icon: 'success'
          }).then(() => {
            this.reloadAcheteurs(); 
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
  
  reloadAcheteurs() {
    this.noteurservice.getAcheteurs().subscribe(
      acheteurs => {
        this.acheteurs = acheteurs;
        this.filteredAcheteurs = acheteurs;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  



  openFormAlert() {
    Swal.fire({
      title: 'Ajouter Acheteur',
      html: `
        <form id="acheteurForm">
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
      preConfirm: () => {
        const form = document.getElementById('acheteurForm') as HTMLFormElement;
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
        
        this.acheteurForm.patchValue(result.value);
        
       
        if (this.acheteurForm.valid) {
          this.addAcheteur();
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
  
  


  ngOnInit(): void {
    this.noteurservice.getAcheteurs().subscribe(
      acheteur => {
        this.acheteurs = acheteur;
        this.filteredAcheteurs = acheteur;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  search(): void {
    const searchValue = this.searchText.toLowerCase();
    this.filteredAcheteurs = this.acheteurs.filter(acheteur =>
      acheteur.NNI.toString().includes(searchValue)
    );
    this.noResultat = this.filteredAcheteurs.length === 0;
    this.searchText = '';
  }

  delete(id: number, i: any): void {
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
        this.noteurservice.deleteAcheteur(id).subscribe(res => {
          this.acheteurs.splice(i, 1);
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
