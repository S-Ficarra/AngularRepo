import { Component } from '@angular/core';
import { Movie } from '../../core/models/movies.models';
import { MoviesService } from '../../core/services/movie.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = "Page d'accueil";
  inTheatre : Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMoviesCurrentlyPlaying().subscribe({
      next: (data) => {
        this.inTheatre = data.results.slice(0,10);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des films', err);
      },
    });
  }

}
