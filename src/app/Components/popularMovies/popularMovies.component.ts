import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Movie } from '../../core/models/movies.models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'popular-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './popularMovies.component.html',
  styleUrls: ['./popularMovies.component.css']
})
export class PopularMovies implements OnInit{

  popularMovies : Movie[] = [];

  constructor(private moviesService: MoviesService) {}


  ngOnInit(): void {
    this.moviesService.getPopularMovies().subscribe({
      next: (data) => {
        this.popularMovies = data.results
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des films', err);
      },
    });
  }



}


