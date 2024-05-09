export class Acte {
    id:number;
    date_transaction:Date;
    montant:number;
    nom_temoin:string;
    NNI_temoin:number;
    nom_notaire:string;
    NNI_notaire:number;
    frais_notaire:number;
    id_acheteur:number;
    id_vendeur:number;
    id_terrain:number;

    constructor(id:number,date_transaction:Date,montant:number,nom_temoin:string,NNI_temoin:number,
        nom_notaire:string,NNI_notaire:number,frais_notaire:number,id_acheteur:number,id_vendeur:number,
        id_terrain:number
    ){
        this.id = id;
        this.date_transaction = date_transaction;
        this.montant = montant;
        this.nom_temoin = nom_temoin;
        this.NNI_temoin = NNI_temoin;
        this.nom_notaire = nom_notaire;
        this.NNI_notaire = NNI_notaire;
        this.frais_notaire = frais_notaire;
        this.id_acheteur = id_acheteur;
        this.id_vendeur = id_vendeur;
        this.id_terrain = id_terrain
    }

}
