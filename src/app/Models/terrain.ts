export class Terrain {
    id:number;
    Identifiant_terrain:string;
    localisation:string;
    superficie:string;
    description:string;
    proprietaire:string;
    coordonnees_gps:string;
    prix:number;
    statut_juridique:string;
    date_acquisition:Date;


    constructor(id:number,Identifiant_terrain:string,localisation:string,superficie:string,
        description:string,proprietaire:string,coordonnees_gps:string,prix:number,statut_juridique:string,
        date_acquisition:Date
    ){
        this.id = id;
        this.Identifiant_terrain = Identifiant_terrain;
        this.localisation = localisation;
        this.superficie = superficie;
        this.description = description;
        this.proprietaire = proprietaire;
        this.coordonnees_gps = coordonnees_gps;
        this.prix = prix
        this.statut_juridique = statut_juridique;
        this.date_acquisition = date_acquisition
    }
}
