import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MoviesService } from '../../core/services/movie.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import { Movie } from '../../core/models/movies.models';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActorsServices } from '../../core/services/actors.service';
import { CastMember } from '../../core/models/actors.models';

@Component({
  selector: 'all-movies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './singleMovie.component.html',
  styleUrls: ['./singleMovie.component.css']
})
export class SingleMovieComponent implements OnInit {

  movieDetails: Movie | undefined;
  movieCast: CastMember[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private actorsService: ActorsServices,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    
    if (movieId) {

      this.movieService.getMovieById(movieId).subscribe({
        next: (data) => {
          this.movieDetails = data;         
          this.titleService.setTitle(data.title);
          this.loadMovieCast(movieId);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du film', err);
        }
      });
    }
  }

  private loadMovieCast(movieId: string): void {
    this.movieService.getCastOfAMovie(movieId).subscribe({
        next: (data) => {
            const topCastMembers = data.cast.slice(0, 15);

            const director = data.crew.find(
                (member: { known_for_department: string }) => member.known_for_department === "Directing"
            );

            if (!director) {
                console.error('Aucun réalisateur trouvé');
                return;
            }

            const directorWithImage$ = this.actorsService.getActorImage(director.id.toString()).pipe(
                map((imagePath) => ({
                    ...director,
                    picture_path: imagePath,
                })),
                catchError(() => {
                    return of({ ...director, picture_path: '' });
                })
            );

            const castWithImages$ = topCastMembers.map((castMember: CastMember) =>
                this.actorsService.getActorImage(castMember.id.toString()).pipe(
                    map((imagePath) => ({
                        ...castMember,
                        picture_path: imagePath,
                    })),
                    catchError(() => {
                        return of({ ...castMember, picture_path: '' });
                    })
                )
            );

            forkJoin([directorWithImage$, ...castWithImages$]).subscribe({
                next: (castWithImages: CastMember[]) => {
                    this.movieCast = castWithImages;
                },
                error: (err) => {
                    console.error('Erreur lors de la récupération des images des acteurs', err);
                },
            });
        },
        error: (err) => {
            console.error('Erreur lors de la récupération du casting', err);
        },
    });
}

}
