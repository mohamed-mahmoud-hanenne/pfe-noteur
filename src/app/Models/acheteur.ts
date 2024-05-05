export class Acheteur {
    id: number;
    nom: string;
    prenom: string;
    date_naissance:Date;
    adresse:string;
    NNI:number;
    numero_tel : number;
    email: string;
    
    

    constructor(id:number,nom: string, prenom:string, date_naissance:Date, adresse: string,NNI:number, 
        numero_tel:number, email: string) 
        {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.date_naissance = date_naissance;
        this.adresse = adresse;
        this.email = email;
        this.NNI = NNI;
        this.numero_tel = numero_tel;
       
    }
}
