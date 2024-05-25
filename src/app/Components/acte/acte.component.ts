import { Component, OnInit } from '@angular/core';
import { Acte } from 'src/app/Models/acte';
import { NoteurService } from 'src/app/service/noteur.service';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { Acheteur } from 'src/app/Models/acheteur';
import * as QRCode from 'qrcode';
import { Terrain } from 'src/app/Models/terrain';


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

  constructor(private noteurservice: NoteurService){}

  ngOnInit(): void {
    this.noteurservice.getActes().subscribe(ac=>{
      this.actes = ac;
      this.filteredActe = ac
    },
    error =>{
      console.log("Il y'a un erreur: ",error);
    }
  );
  this.noteurservice.getAcheteurs().subscribe(a=>{
    this.acheteurs = a;
  });
  this.noteurservice.getVendeurs().subscribe(v=>{
    this.vendeurs = v;
  });
  this.noteurservice.getTerrains().subscribe(t=>{
    this.terrains = t;
  });
  }

  search():void{
    const searchValue = this.searchText.toLowerCase();
    this.filteredActe = this.actes.filter(acte=>
      acte.id.toString().includes(searchValue)
    );
    this.noResultat = this.filteredActe.length === 0;
    this.searchText = '';
  }
  

  deleteActe(id:number,i:any){
    this.noteurservice.deleteActe(id).subscribe(res=>{
      this.actes.splice(i,1);
    })
  }

  

  async downloadActe(acte: Acte): Promise<void> {
    const acheteur = this.acheteurs.find(a => a.id === acte.id_acheteur);
    const vendeur = this.vendeurs.find(v => v.id === acte.id_vendeur);
    const terrain = this.terrains.find(t => t.id === acte.id_terrain);

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
      Je soussigné, ${acte.nom_notaire}, notaire inscrit sous le numéro d'identification nationale ${acte.NNI_notaire},
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

