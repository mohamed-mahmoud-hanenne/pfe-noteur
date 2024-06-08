import { Component, NgZone, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Procuration } from 'src/app/Models/procuration';

@Component({
  selector: 'app-procuration',
  templateUrl: './procuration.component.html',
  styleUrls: ['./procuration.component.scss']
})
export class ProcurationComponent {
  searchText: string = '';
  Procurations: Procuration[] = [];
  filteredProcuration: Procuration[] = [];
  noResultat: boolean = false;

  ProcurationForm: FormGroup = new FormGroup({});
  getId:any;
  updateForm: FormGroup = new FormGroup({});

  constructor(
    private noteurservice: NoteurService,
    private fb: FormBuilder, 
    private ngzone:NgZone,
    private router:Router,
    private activateroute:ActivatedRoute,
  ) {
    this.ProcurationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      adresse: ['', Validators.required],
      NNI: ['', [Validators.required, Validators.maxLength(10)]],
      numero_tel: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]]
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


  addAcheteur() {
    if (this.ProcurationForm.valid) {
      this.noteurservice.addAcheteur(this.ProcurationForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Success',
            text: 'Procuration a ajouté avec succès',
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

  updateAcheteur(id: number, data: any) {
    this.noteurservice.updateAcheteur(data, id).subscribe(
      () => {
        Swal.fire({
          title: 'Success',
          text: 'Acheteur modifié avec succès',
          icon: 'success'
        }).then(() => {
          this.reloadAcheteurs();
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
  
  
  reloadAcheteurs() {
    this.noteurservice.getProcurations().subscribe(
      procurations => {
        this.Procurations = procurations;
        this.filteredProcuration = procurations;
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
        <button id="closeButton" type="button" class="close" style="position: absolute; top: 10px; right: 10px; font-size: 24px; border: none; background: none; cursor: pointer;">&times;</button>
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
      didOpen: () => {
        const closeButton = document.getElementById('closeButton');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            Swal.close();
          });
        }
      },
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
        // Mettez à jour le formulaire Angular avec les valeurs du formulaire SweetAlert2
        this.ProcurationForm.patchValue(result.value);
  
        // Vérifiez si le formulaire Angular est valide avant d'appeler addAcheteur
        if (this.ProcurationForm.valid) {
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
  
  
  // openUpdateAlert(procuration: Procuration) {
  //   Swal.fire({
  //     title: 'Modifier Acheteur',
  //     html: `
  //       <form id="updateForm">
  //         <div class="form-group p-2 mb-3">
  //           <label for="nom" class="text-start">Nom</label>
  //           <input id="nom" name="nom" type="text" class="form-control" value="${procuration.}" />
  //           <span id="nomError" class="text-danger"></span>
  //         </div>
  //         <div class="form-group p-2 mb-3">
  //           <label for="prenom" class="text-start">Prenom</label>
  //           <input id="prenom" name="prenom" type="text" class="form-control" value="${acheteur.prenom}" />
  //           <span id="prenomError" class="text-danger"></span>
  //         </div>
  //         <div class="form-group p-2 mb-3">
  //           <label for="date_naissance" class="text-start">Date de naissance</label>
  //           <input id="date_naissance" name="date_naissance" type="date" class="form-control" value="${acheteur.date_naissance}" />
  //           <span id="date_naissanceError" class="text-danger"></span>
  //         </div>
  //         <div class="form-group p-2 mb-3">
  //           <label for="adresse" class="text-start">Adresse</label>
  //           <input id="adresse" name="adresse" type="text" class="form-control" value="${acheteur.adresse}" />
  //           <span id="adresseError" class="text-danger"></span>
  //         </div>
  //         <div class="form-group p-2 mb-3">
  //           <label for="NNI" class="text-start">NNI</label>
  //           <input id="NNI" name="NNI" type="text" class="form-control" value="${acheteur.NNI}" />
  //           <span id="NNIError" class="text-danger"></span>
  //         </div>
  //         <div class="form-group p-2 mb-3">
  //           <label for="numero_tel" class="text-start">Téléphone</label>
  //           <input id="numero_tel" name="numero_tel" type="tel" class="form-control" value="${acheteur.numero_tel}" />
  //           <span id="numero_telError" class="text-danger"></span>
  //         </div>
  //         <div class="form-group p-2 mb-3">
  //           <label for="email" class="text-start">Email</label>
  //           <input id="email" name="email" type="email" class="form-control" value="${acheteur.email}" />
  //           <span id="emailError" class="text-danger"></span>
  //         </div>
  //       </form>
  //     `,
  //     focusConfirm: false,
  //     customClass: 'swal2-wide',
  //     showCancelButton: true,
  //     confirmButtonText: 'Modifier',
  //     cancelButtonText: 'Annuler',
  //     didOpen: () => {
  //       const updateForm = document.getElementById('updateForm') as HTMLFormElement;
  //       const confirmButton = Swal.getConfirmButton();
  
  //       if (confirmButton) {
  //         confirmButton.addEventListener('click', () => {
  //           const formData = new FormData(updateForm);
  //           this.updateAcheteur(acheteur.id, {
  //             nom: formData.get('nom') as string,
  //             prenom: formData.get('prenom') as string,
  //             date_naissance: formData.get('date_naissance') as string,
  //             adresse: formData.get('adresse') as string,
  //             NNI: formData.get('NNI') as string,
  //             numero_tel: formData.get('numero_tel') as string,
  //             email: formData.get('email') as string
  //           });
  //         });
  //       }
  //     }
  //   });
  // }
  
  


  ngOnInit(): void {
    this.noteurservice.getProcurations().subscribe(
      procuration => {
        this.Procurations = procuration;
        this.filteredProcuration = procuration;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  search(): void {
    const searchValue = this.searchText.toLowerCase();
    this.filteredProcuration = this.Procurations.filter(procuration =>
      procuration.id.toString().includes(searchValue)
    );
    this.noResultat = this.filteredProcuration.length === 0;
    // this.searchText = '';
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
          this.Procurations.splice(i, 1);
          Swal.fire({
            title: "Success!",
            text: "Acheteur a supprimé avec succès.",
            icon: "success"
          });
        }, error => {
          Swal.fire({
            title: "Error!",
            text: "La suppression a echoué.",
            icon: "error"
          });
          console.error('Il ya un erreur!', error);
        });
      }
    });
  }

}
