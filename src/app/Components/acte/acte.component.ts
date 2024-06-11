import { Component, OnInit } from '@angular/core';
import { Acte } from 'src/app/Models/acte';
import { NoteurService } from 'src/app/service/noteur.service';
import { jsPDF } from 'jspdf';
import { Acheteur } from 'src/app/Models/acheteur';
import * as QRCode from 'qrcode';
import { Terrain } from 'src/app/Models/terrain';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-acte',
  templateUrl: './acte.component.html',
  styleUrls: ['./acte.component.scss']
})
export class ActeComponent implements OnInit{


  searchText: string = '';
  actes: Acte[] = [];
  acheteurs:Acheteur[] = [];
  vendeurs:Acheteur[] = [];
  terrains:Terrain[] = [];
  filteredActe: Acte[] = [];
  noResultat:boolean = false;
  acheteursinacte : Acheteur[] = [];
  vendeursinacte : Acheteur[] = [];
  terrainsinacte : Terrain[] = [];

  acteForm :FormGroup = new FormGroup({});

  constructor(
    private noteurservice: NoteurService,
    private fb:FormBuilder
  ){
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

  ngOnInit(): void {
    this.noteurservice.getActes().subscribe(ac=>{
      this.actes = ac;
      this.filteredActe = ac
    },
    error =>{
      Swal.fire({
        title: 'Erreur!',
        text: 'Il ya un erreur lors de la recuperation!',
        icon: 'error'
      });
    }
  );
  this.noteurservice.getAcheteurs().subscribe(a=>{
    this.acheteursinacte = a;
  });
  this.noteurservice.getVendeurs().subscribe(v=>{
    this.vendeursinacte = v;
  });
  this.noteurservice.getTerrains().subscribe(t=>{
    this.terrainsinacte = t;
  });
  }


getAcheteurName(id: number): string {
  const acheteur = this.acheteursinacte.find(a => a.id === id);
  return acheteur ? `${acheteur.nom} ${acheteur.prenom}` : 'N/A';
}

getVendeurName(id: number): string {
  const vendeur = this.vendeursinacte.find(v => v.id === id);
  return vendeur ? `${vendeur.nom} ${vendeur.prenom}` : 'N/A';
}

getTerrainIdentifiant(id: number): string {
  const terrain = this.terrainsinacte.find(t => t.id === id);
  return terrain ? terrain.Identifiant_terrain : 'N/A';
}


  addActe() {
    if (this.acteForm.valid) {
      this.noteurservice.addActe(this.acteForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Succès',
            text: 'Acte a ajouté avec succès',
            icon: 'success'
          }).then(() => {
            this.reloadActe(); 
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

  updateActe(id: number, data: any) {
    this.noteurservice.updateTransaction(data, id).subscribe(
      () => {
        Swal.fire({
          title: 'Succès',
          text: 'Acte a modifié avec succès',
          icon: 'success'
        }).then(() => {
          this.reloadActe();
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



  reloadActe() {
    this.noteurservice.getActes().subscribe(
      actes => {
        this.actes = actes;
        this.filteredActe = actes;
      },
      error => {
        console.error('Il ya un erreur!', error);
      }
    );
  }

  openFormAlert(acheteurs: any[], vendeurs: any[], terrains: any[]) {
    Swal.fire({
      title: 'Ajouter Acte',
      html: `
        <button id="closeButton" type="button" class="close" style="position: absolute; top: 10px; right: 10px; font-size: 24px; border: none; background: none; cursor: pointer;">&times;</button>
        <form id="acteForm" style="font-size: 0.9rem; padding: 10px; max-height: 450px; overflow-y: auto;">
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="date_transaction">Date transaction</label>
            <input id="date_transaction" name="date_transaction" type="date" class="form-control" />
            <span id="date_transactionError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="montant">Montant</label>
            <input id="montant" name="montant" type="number" class="form-control" />
            <span id="montantError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="nom_temoin">Nom témoin</label>
            <input id="nom_temoin" name="nom_temoin" type="text" class="form-control" />
            <span id="nom_temoinError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="NNI_temoin">NNI témoin</label>
            <input id="NNI_temoin" name="NNI_temoin" type="number" class="form-control" />
            <span id="NNI_temoinError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="nom_notaire">Nom notaire</label>
            <input id="nom_notaire" name="nom_notaire" type="text" class="form-control" />
            <span id="nom_notaireError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="NNI_notaire">NNI notaire</label>
            <input id="NNI_notaire" name="NNI_notaire" type="number" class="form-control" />
            <span id="NNI_notaireError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="frais_notaire">Frais notaire</label>
            <input id="frais_notaire" name="frais_notaire" type="number" class="form-control" />
            <span id="frais_notaireError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="id_acheteur">Nom acheteur</label>
            <select id="id_acheteur" name="id_acheteur" class="form-select">
            ${acheteurs.map(acheteur => `<option value="${acheteur.id}">${acheteur.nom}</option>`).join('')}
          </select>
            <span id="id_acheteurError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="id_vendeur">Nom vendeur</label>
            <select id="id_vendeur" name="id_vendeur" class="form-select">
            ${vendeurs.map(vendeur => `<option value="${vendeur.id}">${vendeur.nom}</option>`).join('')}
          </select>
            <span id="id_vendeurError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="id_terrain">Identifiant terrain</label>
            <select id="id_terrain" name="id_terrain" class="form-select">
        ${terrains.map(terrain => `<option value="${terrain.id}">${terrain.Identifiant_terrain}</option>`).join('')}
      </select>
            <span id="id_terrainError" class="text-danger"></span>
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
        const form = document.getElementById('acteForm') as HTMLFormElement;
        const formData = new FormData(form);
        return {
          date_transaction: formData.get('date_transaction') as string,
          montant: formData.get('montant') as string,
          nom_temoin: formData.get('nom_temoin') as string,
          NNI_temoin: formData.get('NNI_temoin') as string,
          nom_notaire: formData.get('nom_notaire') as string,
          NNI_notaire: formData.get('NNI_notaire') as string,
          frais_notaire: formData.get('frais_notaire') as string,
          id_acheteur: formData.get('id_acheteur') as string,
          id_vendeur: formData.get('id_vendeur') as string,
          id_terrain: formData.get('id_terrain') as string
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.acteForm.patchValue(result.value);
        if (this.acteForm.valid) {
          this.addActe();
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

  openUpdateAlert(acte: Acte,acheteurs: any[], vendeurs: any[], terrains: any[]) {
    Swal.fire({
      title: 'Modifier Acte',
      html: `
      <button id="closeButton" type="button" class="close" style="position: absolute; top: 10px; right: 10px; font-size: 24px; border: none; background: none; cursor: pointer;">&times;</button>
        <form id="updateForm" style="font-size: 0.9rem; padding: 10px; max-height: 400px; overflow-y: auto;">
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="date_transaction" class="text-start">Date de Transaction</label>
            <input id="date_transaction" name="date_transaction" type="date" class="form-control" value="${acte.date_transaction}" />
            <span id="date_transactionError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="montant" class="text-start">Montant</label>
            <input id="montant" name="montant" type="number" class="form-control" value="${acte.montant}" />
            <span id="montantError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="nom_temoin" class="text-start">Nom du Témoin</label>
            <input id="nom_temoin" name="nom_temoin" type="text" class="form-control" value="${acte.nom_temoin}" />
            <span id="nom_temoinError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="NNI_temoin" class="text-start">NNI du Témoin</label>
            <input id="NNI_temoin" name="NNI_temoin" type="text" class="form-control" value="${acte.NNI_temoin}" />
            <span id="NNI_temoinError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="nom_notaire" class="text-start">Nom du Notaire</label>
            <input id="nom_notaire" name="nom_notaire" type="text" class="form-control" value="${acte.nom_notaire}" />
            <span id="nom_notaireError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="NNI_notaire" class="text-start">NNI du Notaire</label>
            <input id="NNI_notaire" name="NNI_notaire" type="text" class="form-control" value="${acte.NNI_notaire}" />
            <span id="NNI_notaireError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="frais_notaire" class="text-start">Frais de Notaire</label>
            <input id="frais_notaire" name="frais_notaire" type="number" class="form-control" value="${acte.frais_notaire}" />
            <span id="frais_notaireError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="id_acheteur" class="text-start">Nom Acheteur</label>
            <select id="id_acheteur" name="id_acheteur" class="form-select">
            ${acheteurs.map(acheteur => `<option value="${acheteur.id}">${acheteur.nom}</option>`).join('')}
          </select>
            <span id="id_acheteurError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="id_vendeur" class="text-start">Nom Vendeur</label>
            <select id="id_vendeur" name="id_vendeur" class="form-select">
            ${vendeurs.map(vendeur => `<option value="${vendeur.id}">${vendeur.nom}</option>`).join('')}
          </select>
            <span id="id_vendeurError" class="text-danger"></span>
          </div>
          <div class="form-group mb-3" style="margin-bottom: 10px;">
            <label for="id_terrain" class="text-start">ID Terrain</label>
            <select id="id_terrain" name="id_terrain" class="form-select">
            ${terrains.map(terrain => `<option value="${terrain.id}">${terrain.Identifiant_terrain}</option>`).join('')}
          </select>
            <span id="id_terrainError" class="text-danger"></span>
          </div>
        </form>
      `,
      focusConfirm: false,
      customClass: 'swal2-wide',
      showCancelButton: false,
      confirmButtonText: 'Modifier',
      // cancelButtonText: 'Annuler',
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
            this.updateActe(acte.id, {
              date_transaction: formData.get('date_transaction') as string,
              montant: formData.get('montant') as string,
              nom_temoin: formData.get('nom_temoin') as string,
              NNI_temoin: formData.get('NNI_temoin') as string,
              nom_notaire: formData.get('nom_notaire') as string,
              NNI_notaire: formData.get('NNI_notaire') as string,
              frais_notaire: formData.get('frais_notaire') as string,
              id_acheteur: formData.get('id_acheteur') as string,
              id_vendeur: formData.get('id_vendeur') as string,
              id_terrain: formData.get('id_terrain') as string,
            });
          });
        }
      }
  });

  }
  

  
  search():void{
    const searchValue = this.searchText.toLowerCase();
    this.filteredActe = this.actes.filter(acte=>
      acte.id.toString().includes(searchValue)
    );
    this.noResultat = this.filteredActe.length === 0;
    // this.searchText = '';
  }
  

  // deleteActe(id:number,i:any){
  //   this.noteurservice.deleteActe(id).subscribe(res=>{
  //     this.actes.splice(i,1);
  //   })
  // }

  deleteActe(id: number, i: any){
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
        this.noteurservice.deleteActe(id).subscribe(res => {
          this.actes.splice(i, 1);
          Swal.fire({
            title: "Succès!",
            text: "Acte a supprimé avec succès.",
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

  

  async downloadActe(acte: Acte): Promise<void> {
    const acheteur = this.acheteursinacte.find(a => a.id === acte.id_acheteur);
    const vendeur = this.vendeursinacte.find(v => v.id === acte.id_vendeur);
    const terrain = this.terrainsinacte.find(t => t.id === acte.id_terrain);

    if (!acheteur || !vendeur || !terrain) {
      console.error('Acheteur, vendeur ou terrain non trouvé');
      return;
    }

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

    // Titre de l'acte
    doc.setFontSize(18);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(0, 122, 255);
    doc.text('Attestation de Vente de Terrain', 105, 80, { align: 'center' });

    // Détails de l'acte
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    const acteDetails = `
      Je soussigné, ${acte.nom_notaire}, notaire inscrit sous le numéro d'identification nationale 
      ${acte.NNI_notaire},
      atteste par la présente que le terrain identifié par le matricule ${terrain.Identifiant_terrain} a été vendu par 
      ${vendeur.nom} ${vendeur.prenom} (NNI: ${vendeur.NNI}) à ${acheteur.nom} ${acheteur.prenom} (NNI: ${acheteur.NNI}).
      La transaction a été effectuée le ${acte.date_transaction} pour un montant de ${acte.montant} MRO, 
      et des frais de notaire s'élevant à ${acte.frais_notaire} MRO ont été réglés.
      Témoin : ${acte.nom_temoin} (NNI: ${acte.NNI_temoin}).

      Cette attestation est délivrée pour servir et valoir ce que de droit.
          `;

    const splitText = doc.splitTextToSize(acteDetails, 180);
    doc.text(splitText, 15, 100);

    // Mettre en surbrillance certaines clés
    // doc.setTextColor(0, 122, 255);
    // doc.setFont('Helvetica', 'bold');
    // doc.text(`Notaire: ${acte.nom_notaire}`, 15, 130);
    // doc.text(`NNI Notaire: ${acte.NNI_notaire}`, 15, 140);
    // doc.setTextColor(0, 0, 0);
    // doc.setFont('Helvetica', 'normal');

    // doc.setTextColor(0, 122, 255);
    // doc.text(`Acheteur: ${acheteur.nom} ${acheteur.prenom}`, 15, 150);
    // doc.text(`NNI Acheteur: ${acheteur.NNI}`, 15, 160);
    // doc.text(`Vendeur: ${vendeur.nom} ${vendeur.prenom}`, 15, 170);
    // doc.text(`NNI Vendeur: ${vendeur.NNI}`, 15, 180);
    // doc.text(`Matricule Terrain: ${terrain.Identifiant_terrain}`, 15, 190);
    // doc.setTextColor(0, 0, 0);

    // Pied de page
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Fait à Nouakchott, le ${date}.`, 200, 200,{ align: 'right' });
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(255, 165, 0);
    doc.text(`${acte.nom_notaire}`, 200, 205, { align: 'right' });
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`Notaire`, 200, 210, { align: 'right' });

   
    const qrCodeData = `
    Notaire: ${acte.nom_notaire}, NNI: ${acte.NNI_notaire}
    Acheteur: ${acheteur.nom} ${acheteur.prenom}, NNI: ${acheteur.NNI}
    Vendeur: ${vendeur.nom} ${vendeur.prenom}, NNI: ${vendeur.NNI}
    Terrain ID: ${terrain.Identifiant_terrain}
    Proprietaire: ${terrain.proprietaire}
    Localisation: ${terrain.localisation}
    Date de transaction: ${acte.date_transaction}
    Montant: ${acte.montant} MRO
    Frais de notaire: ${acte.frais_notaire} MRO
    Témoin: ${acte.nom_temoin}, NNI: ${acte.NNI_temoin}
    `;
    
 
       const qrCodeUrl = await QRCode.toDataURL(qrCodeData);


       doc.text("Scanner pour plus d'informaations", 105, 220, { align: 'center' });
       doc.addImage(qrCodeUrl, 'JPEG', 80, 230, 50, 50);

    doc.save(`acte_${acte.id}.pdf`);
  }
}

