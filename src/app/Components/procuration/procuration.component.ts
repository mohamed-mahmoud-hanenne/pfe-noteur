import { Component, NgZone, OnInit } from '@angular/core';
import { NoteurService } from 'src/app/service/noteur.service';
import { Acheteur } from 'src/app/Models/acheteur';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Procuration } from 'src/app/Models/procuration';
import { Acte } from 'src/app/Models/acte';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';

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
      nom_parent: ['', [Validators.required, Validators.maxLength(255)]],
      prenom_parent: ['', [Validators.required, Validators.maxLength(255)]],
      date_naissance_enfant: ['', Validators.required],
      adresse_parent: ['', [Validators.required, Validators.maxLength(255)]],
      nni_parent: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      numero_tel_parent: ['', [Validators.required, Validators.pattern(/^[2-4][0-9]{7}$/)]],
      email_parent: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      nom_enfant: ['', [Validators.required, Validators.maxLength(255)]],
      prenom_enfant: ['', [Validators.required, Validators.maxLength(255)]],
      nom_gardien: ['', [Validators.required, Validators.maxLength(255)]],
      prenom_gardien: ['', [Validators.required, Validators.maxLength(255)]],
      numero_tel_gardien: ['', [Validators.required, Validators.pattern(/^[2-4][0-9]{7}$/)]],
      date_voyage: ['', Validators.required],
      destination: ['', [Validators.required, Validators.maxLength(255)]]
  
    });

    this.updateForm = this.fb.group({
      nom_parent: ['', [Validators.required, Validators.maxLength(255)]],
      prenom_parent: ['', [Validators.required, Validators.maxLength(255)]],
      date_naissance_enfant: ['', Validators.required],
      adresse_parent: ['', [Validators.required, Validators.maxLength(255)]],
      nni_parent: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      numero_tel_parent: ['', [Validators.required, Validators.pattern(/^[2-4][0-9]{7}$/)]],
      email_parent: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      nom_enfant: ['', [Validators.required, Validators.maxLength(255)]],
      prenom_enfant: ['', [Validators.required, Validators.maxLength(255)]],
      nom_gardien: ['', [Validators.required, Validators.maxLength(255)]],
      prenom_gardien: ['', [Validators.required, Validators.maxLength(255)]],
      numero_tel_gardien: ['', [Validators.required, Validators.pattern(/^[2-4][0-9]{7}$/)]],
      date_voyage: ['', Validators.required],
      destination: ['', [Validators.required, Validators.maxLength(255)]]
  
    });

    

  }


  addProcuration() {
    if (this.ProcurationForm.valid) {
      this.noteurservice.addProcuration(this.ProcurationForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Succès',
            text: 'Procuration a ajouté avec succès',
            icon: 'success'
          }).then(() => {
            this.reloadProcurations(); 
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

  updateProcuration(id: number, data: any) {
    this.noteurservice.updateProcuration(data, id).subscribe(
      () => {
        Swal.fire({
          title: 'Succès',
          text: 'Procuration a modifié avec succès',
          icon: 'success'
        }).then(() => {
          this.reloadProcurations();
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
  
  
  reloadProcurations() {
    this.noteurservice.getProcurations().subscribe(
      procurations => {
        this.Procurations = procurations;
        this.filteredProcuration = procurations;
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
      title: 'Ajouter Procuration',
      html: `
        <button id="closeButton" type="button" class="close" style="position: absolute; top: 10px; right: 10px; font-size: 24px; border: none; background: none; cursor: pointer;">&times;</button>
        <form id="infoForm" style="font-size: 0.9rem; padding: 10px; max-height: 400px; overflow-y: auto;">
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="nom_parent" class="text-start">Nom Parent</label>
            <input id="nom_parent" name="nom_parent" type="text" class="form-control form-control-sm" style="width: 100%;" />
            <span id="nom_parentError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="prenom_parent" class="text-start">Prénom Parent</label>
            <input id="prenom_parent" name="prenom_parent" type="text" class="form-control form-control-sm" style="width: 100%;" />
            <span id="prenom_parentError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="date_naissance_enfant" class="text-start">Date de Naissance Enfant</label>
            <input id="date_naissance_enfant" name="date_naissance_enfant" type="date" class="form-control form-control-sm" style="width: 100%;" />
            <span id="date_naissance_enfantError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="adresse_parent" class="text-start">Adresse Parent</label>
            <input id="adresse_parent" name="adresse_parent" type="text" class="form-control form-control-sm" style="width: 100%;" />
            <span id="adresse_parentError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="nni_parent" class="text-start">NNI Parent</label>
            <input id="nni_parent" name="nni_parent" type="text" class="form-control form-control-sm" style="width: 100%;" />
            <span id="nni_parentError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="numero_tel_parent" class="text-start">Téléphone Parent</label>
            <input id="numero_tel_parent" name="numero_tel_parent" type="tel" class="form-control form-control-sm" style="width: 100%;" />
            <span id="numero_tel_parentError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="email_parent" class="text-start">Email Parent</label>
            <input id="email_parent" name="email_parent" type="email" class="form-control form-control-sm" style="width: 100%;" />
            <span id="email_parentError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="nom_enfant" class="text-start">Nom Enfant</label>
            <input id="nom_enfant" name="nom_enfant" type="text" class="form-control form-control-sm" style="width: 100%;" />
            <span id="nom_enfantError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="prenom_enfant" class="text-start">Prénom Enfant</label>
            <input id="prenom_enfant" name="prenom_enfant" type="text" class="form-control form-control-sm" style="width: 100%;" />
            <span id="prenom_enfantError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="nom_gardien" class="text-start">Nom Gardien</label>
            <input id="nom_gardien" name="nom_gardien" type="text" class="form-control form-control-sm" style="width: 100%;" />
            <span id="nom_gardienError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="prenom_gardien" class="text-start">Prénom Gardien</label>
            <input id="prenom_gardien" name="prenom_gardien" type="text" class="form-control form-control-sm" style="width: 100%;" />
            <span id="prenom_gardienError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="numero_tel_gardien" class="text-start">Téléphone Gardien</label>
            <input id="numero_tel_gardien" name="numero_tel_gardien" type="tel" class="form-control form-control-sm" style="width: 100%;" />
            <span id="numero_tel_gardienError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="date_voyage" class="text-start">Date Voyage</label>
            <input id="date_voyage" name="date_voyage" type="date" class="form-control form-control-sm" style="width: 100%;" />
            <span id="date_voyageError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="destination" class="text-start">Destination</label>
            <input id="destination" name="destination" type="text" class="form-control form-control-sm" style="width: 100%;" />
            <span id="destinationError" class="text-danger"></span>
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
        const form = document.getElementById('infoForm') as HTMLFormElement;
        const formData = new FormData(form);
        return {
          nom_parent: formData.get('nom_parent') as string,
          prenom_parent: formData.get('prenom_parent') as string,
          date_naissance_enfant: formData.get('date_naissance_enfant') as string,
          adresse_parent: formData.get('adresse_parent') as string,
          nni_parent: formData.get('nni_parent') as string,
          numero_tel_parent: formData.get('numero_tel_parent') as string,
          email_parent: formData.get('email_parent') as string,
          nom_enfant: formData.get('nom_enfant') as string,
          prenom_enfant: formData.get('prenom_enfant') as string,
          nom_gardien: formData.get('nom_gardien') as string,
          prenom_gardien: formData.get('prenom_gardien') as string,
          numero_tel_gardien: formData.get('numero_tel_gardien') as string,
          date_voyage: formData.get('date_voyage') as string,
          destination: formData.get('destination') as string
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Mettez à jour le formulaire Angular avec les valeurs du formulaire SweetAlert2
        this.ProcurationForm.patchValue(result.value);
  
        // Vérifiez si le formulaire Angular est valide avant d'appeler addProcuration
        if (this.ProcurationForm.valid) {
          this.addProcuration();
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
  
  
  openUpdateAlert(Procuration: Procuration) {
    Swal.fire({
        title: 'Modifier Procuration',
        html: `
        <button id="closeButton" type="button" class="close" style="position: absolute; top: 10px; right: 10px; font-size: 24px; border: none; background: none; cursor: pointer;">&times;</button>
          <form id="updateForm" style="font-size: 0.9rem; padding: 10px; max-height: 400px; overflow-y: auto;">
            <div class="form-group p-2 mb-3">
              <label for="nom_parent" class="text-start">Nom Parent</label>
              <input id="nom_parent" name="nom_parent" type="text" class="form-control" value="${Procuration.nom_parent}" />
              <span id="nom_parentError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="prenom_parent" class="text-start">Prenom Parent</label>
              <input id="prenom_parent" name="prenom_parent" type="text" class="form-control" value="${Procuration.prenom_parent}" />
              <span id="prenom_parentError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="date_naissance_enfant" class="text-start">Date de naissance Enfant</label>
              <input id="date_naissance_enfant" name="date_naissance_enfant" type="date" class="form-control" value="${Procuration.date_naissance_enfant}" />
              <span id="date_naissance_enfantError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="adresse_parent" class="text-start">Adresse Parent</label>
              <input id="adresse_parent" name="adresse_parent" type="text" class="form-control" value="${Procuration.adresse_parent}" />
              <span id="adresse_parentError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="nni_parent" class="text-start">NNI Parent</label>
              <input id="nni_parent" name="nni_parent" type="text" class="form-control" value="${Procuration.nni_parent}" />
              <span id="nni_parentError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="numero_tel_parent" class="text-start">Téléphone Parent</label>
              <input id="numero_tel_parent" name="numero_tel_parent" type="tel" class="form-control" value="${Procuration.numero_tel_parent}" />
              <span id="numero_tel_parentError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="email_parent" class="text-start">Email Parent</label>
              <input id="email_parent" name="email_parent" type="email" class="form-control" value="${Procuration.email_parent}" />
              <span id="email_parentError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="nom_enfant" class="text-start">Nom Enfant</label>
              <input id="nom_enfant" name="nom_enfant" type="text" class="form-control" value="${Procuration.nom_enfant}" />
              <span id="nom_enfantError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="prenom_enfant" class="text-start">Prenom Enfant</label>
              <input id="prenom_enfant" name="prenom_enfant" type="text" class="form-control" value="${Procuration.prenom_enfant}" />
              <span id="prenom_enfantError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="nom_gardien" class="text-start">Nom Gardien</label>
              <input id="nom_gardien" name="nom_gardien" type="text" class="form-control" value="${Procuration.nom_gardien}" />
              <span id="nom_gardienError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="prenom_gardien" class="text-start">Prenom Gardien</label>
              <input id="prenom_gardien" name="prenom_gardien" type="text" class="form-control" value="${Procuration.prenom_gardien}" />
              <span id="prenom_gardienError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="numero_tel_gardien" class="text-start">Téléphone Gardien</label>
              <input id="numero_tel_gardien" name="numero_tel_gardien" type="tel" class="form-control" value="${Procuration.numero_tel_gardien}" />
              <span id="numero_tel_gardienError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="date_voyage" class="text-start">Date Voyage</label>
              <input id="date_voyage" name="date_voyage" type="date" class="form-control" value="${Procuration.date_voyage}" />
              <span id="date_voyageError" class="text-danger"></span>
            </div>
            <div class="form-group p-2 mb-3">
              <label for="destination" class="text-start">Destination</label>
              <input id="destination" name="destination" type="text" class="form-control" value="${Procuration.destination}" />
              <span id="destinationError" class="text-danger"></span>
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
                    this.updateProcuration(Procuration.id, {
                        nom_parent: formData.get('nom_parent') as string,
                        prenom_parent: formData.get('prenom_parent') as string,
                        date_naissance_enfant: formData.get('date_naissance_enfant') as string,
                        adresse_parent: formData.get('adresse_parent') as string,
                        nni_parent: formData.get('nni_parent') as string,
                        numero_tel_parent: formData.get('numero_tel_parent') as string,
                        email_parent: formData.get('email_parent') as string,
                        nom_enfant: formData.get('nom_enfant') as string,
                        prenom_enfant: formData.get('prenom_enfant') as string,
                        nom_gardien: formData.get('nom_gardien') as string,
                        prenom_gardien: formData.get('prenom_gardien') as string,
                        numero_tel_gardien: formData.get('numero_tel_gardien') as string,
                        date_voyage: formData.get('date_voyage') as string,
                        destination: formData.get('destination') as string,
                    });
                });
            }
        },
    });
}

  


  ngOnInit(): void {
    this.noteurservice.getProcurations().subscribe(
      procuration => {
        this.Procurations = procuration;
        this.filteredProcuration = procuration;
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

  search(): void {
    const searchValue = this.searchText.toLowerCase();
    this.filteredProcuration = this.Procurations.filter(procuration =>
      procuration.destination.toString().includes(searchValue)
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
        this.noteurservice.deleteProcuration(id).subscribe(res => {
          this.Procurations.splice(i, 1);
          Swal.fire({
            title: "Succès!",
            text: "Procuration a supprimé avec succès.",
            icon: "success"
          });
        }, error => {
          Swal.fire({
            title: "Erreur!",
            text: "La suppression a echoué.",
            icon: "error"
          });
          
        });
      }
    });
  }



  async downloadProcuration(procuration: Procuration): Promise<void> {
    const doc = new jsPDF();

    // En-tête du PDF
    doc.setFontSize(16);
    doc.setFont('Helvetica', 'bold');
    doc.text('Nom Notaire: Mohamed Mahmoud', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.text('Adresse Notaire: Tevragh Zeina', 105, 30, { align: 'center' });
    doc.text('Tél: 30736330', 105, 35, { align: 'center' });
    doc.text('Email: medmahmoud@gmail.com', 105, 40, { align: 'center' });

    // Titre de la procuration
    doc.setFontSize(18);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(0, 122, 255);
    doc.text('Procuration Enfant mineur', 105, 80, { align: 'center' });

    // Détails de la procuration
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    const procurationDetails = `
      Je soussigné, Mohamed Mahmoud, notaire inscrit sous le numéro d'identification nationale 
      4522884379
      atteste par la présente que ${procuration.nom_parent} ${procuration.prenom_parent} (NNI: ${procuration.nni_parent}) donne procuration à 
      ${procuration.nom_gardien} ${procuration.prenom_gardien} (téléphone: ${procuration.numero_tel_gardien}) pour s'occuper de leur enfant 
      ${procuration.nom_enfant} ${procuration.prenom_enfant}, né(e) le ${procuration.date_naissance_enfant}, pendant leur voyage prévu du ${procuration.date_voyage} 
      à destination de ${procuration.destination}.
      Les coordonnées du parent sont :
      Adresse: ${procuration.adresse_parent},
      Téléphone: ${procuration.numero_tel_parent},
      Email: ${procuration.email_parent}.


      Cette procuration est délivrée pour servir et valoir ce que de droit.
          `;

    const splitText = doc.splitTextToSize(procurationDetails, 180);
    doc.text(splitText, 15, 100);

    // Pied de page
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Fait à Nouakchott, le ${date}.`, 200, 200, { align: 'right' });
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(255, 165, 0);
    doc.text(`Mohamed Mahmoud`, 200, 205, { align: 'right' });
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`Notaire`, 200, 210, { align: 'right' });

    const qrCodeData = `
    Parent: ${procuration.nom_parent} ${procuration.prenom_parent}, NNI: ${procuration.nni_parent}
    Gardien: ${procuration.nom_gardien} ${procuration.prenom_gardien}, NNI: ${procuration.numero_tel_gardien}
    Enfant: ${procuration.nom_enfant} ${procuration.prenom_enfant}, Date de naissance: ${procuration.date_naissance_enfant}
    Date de voyage: ${procuration.date_voyage}, Destination: ${procuration.destination}
    Adresse Parent: ${procuration.adresse_parent}, Téléphone: ${procuration.numero_tel_parent}, Email: ${procuration.email_parent}
   
    `;

    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

    doc.text("Scanner pour plus d'informations", 105, 220, { align: 'center' });
    doc.addImage(qrCodeUrl, 'JPEG', 80, 230, 50, 50);

    doc.save(`procuration_${procuration.id}.pdf`);
}




}


