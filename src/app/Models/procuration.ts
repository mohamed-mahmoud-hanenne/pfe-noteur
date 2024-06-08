export class Procuration {
    id:number;
    nom_parent: string;
    prenom_parent: string;
    date_naissance_enfant: Date;
    adresse_parent: string;
    nni_parent: number;
    numero_tel_parent: number;
    email_parent: string;
    nom_enfant: string;
    prenom_enfant: string;
    nom_gardien: string;
    prenom_gardien: string;
    numero_tel_gardien: number;
    date_voyage: Date;
    destination: string;

    constructor(
        id:number,nom_parent:string,prenom_parent:string,date_naissance_enfant:Date,adresse_parent:string,
        nni_parent:number,numero_tel_parent:number,email_parent:string,nom_enfant:string,prenom_enfant:string,
        nom_gardien:string,prenom_gardien:string,numero_tel_gardien:number,date_voyage:Date,destination:string
    )
    {
        this.id = id;
        this.nom_parent = nom_parent;
        this.prenom_parent = prenom_parent;
        this.date_naissance_enfant = date_naissance_enfant;
        this.adresse_parent = adresse_parent;
        this.nni_parent = nni_parent;
        this.numero_tel_parent = numero_tel_parent;
        this.email_parent = email_parent;
        this.nom_enfant = nom_enfant;
        this.prenom_enfant = prenom_enfant;
        this.nom_gardien = nom_gardien;
        this.prenom_gardien = prenom_gardien;
        this.numero_tel_gardien = numero_tel_gardien;
        this.date_voyage = date_voyage;
        this.destination = destination
    }
}
