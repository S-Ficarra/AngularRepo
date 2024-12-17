import { Component } from '@angular/core';

@Component({
  selector: 'page-not-found',
  standalone: true,
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.css']
})
export class PageNotFoundComponent {
  // Propriétés du composant
  title = "Aucun contenu à cette adresse";
}