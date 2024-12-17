import { Component, OnInit } from '@angular/core';
import { ActorDetails } from '../../core/models/actors.models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ActorsServices } from '../../core/services/actors.service';
import { CommonModule } from '@angular/common';
import { FilmographyMovie } from '../../core/models/movies.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent implements OnInit{

    actor : ActorDetails | undefined;
    filmography: FilmographyMovie[] = []

    
  constructor(
    private route: ActivatedRoute,
    private actorsService: ActorsServices,
    private titleService: Title
  ) {}


    ngOnInit(): void {
        const actorId = this.route.snapshot.paramMap.get('id');

        if (actorId){
        this.actorsService.getActor(actorId).subscribe({
            next: (data) => {
                this.actor = data;
                this.titleService.setTitle(data.name);
            },
            error: (err) => {
                console.error("Erreur lors de la récupération de l'acteur", err);
            }
            });

        this.actorsService.getFilmography(actorId).subscribe({
            next: (data) => {
                const sortedFilms = data.cast.sort((a: FilmographyMovie, b: FilmographyMovie) => b.popularity - a.popularity);
                this.filmography = sortedFilms.slice(0, 20); // Limite à 20 films maximum

            },
            error: (err) => {
                console.error("Erreur lors de la récupération de l'acteur", err);
            }
            });
        }

        }
       


}


