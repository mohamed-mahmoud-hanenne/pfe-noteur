import { Component, OnInit } from '@angular/core';
import { Acte } from 'src/app/Models/acte';
import { NoteurService } from 'src/app/service/noteur.service';
import * as $ from 'jquery';
import 'bootstrap';



@Component({
  selector: 'app-acte',
  templateUrl: './acte.component.html',
  styleUrls: ['./acte.component.scss']
})
export class ActeComponent implements OnInit{
  
  searchText: string = '';
  actes: Acte[] = [];
  filteredActe: Acte[] = [];
  noResultat: boolean = false; // Nouvelle propriété pour gérer l'état de non-résultat
  acteToDelete: { id: number, index: number } | null = null; // Nouvelle propriété pour stocker l'acte à supprimer

  constructor(private noteurservice: NoteurService) {}

  ngOnInit(): void {
    this.noteurservice.getActes().subscribe(
      data => {
        console.log('Actes reçus:', data); // Vérifie que les actes sont bien reçus
        this.actes = data;
        this.filteredActe = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  search(): void {
    const searchValue = this.searchText.toLowerCase();
    console.log('Valeur de recherche:', searchValue); // Vérifie la valeur de recherche
    this.filteredActe = this.actes.filter(acte =>
      acte.id.toString().toLowerCase().includes(searchValue) 
    );
    console.log('Actes filtrés:', this.filteredActe); // Vérifie les résultats filtrés
    this.noResultat = this.filteredActe.length === 0;
  }

  confirmDelete(id: number, index: number): void {
    this.acteToDelete = { id, index };
  }

  deleteActe(): void {
    if (this.acteToDelete !== null) {
      const { id, index } = this.acteToDelete;
      this.noteurservice.deleteActe(id).subscribe(res => {
        this.actes.splice(index, 1);
        this.filteredActe = this.actes; // Met à jour la liste filtrée
        this.search(); // Refaire la recherche pour mettre à jour l'état de non-résultat
        this.acteToDelete = null; // Réinitialiser l'acte à supprimer
        ($('#deleteActeModal') as any).modal('hide'); // Fermer le modal
      });
    }
  }
}
