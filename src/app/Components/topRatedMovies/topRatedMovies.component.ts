import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Movie } from '../../core/models/movies.models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'top-rated-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './topRatedMovies.component.html',
  styleUrls: ['./topRatedMovies.component.css']
})
export class TopRatedMoviesComponent implements OnInit{

  topRatedMovies : Movie[] = [];

  constructor(private moviesService: MoviesService) {}


  ngOnInit(): void {
    this.moviesService.getTopRatedMovies().subscribe({
      next: (data) => {
        this.topRatedMovies = data.results
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des films', err);
      },
    });
  }



}


