import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { CastMember } from '../models/actors.models';

@Injectable({providedIn: 'root'})
export class ActorsServices {

  private apiUrl = 'https://api.themoviedb.org/3/person';


  constructor(private http: HttpClient) { }


  getActorImage(actorId: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.access_token}`,
    });
  
    return this.http.get<any>(`${this.apiUrl}/${actorId}/images`, { headers }).pipe(
      map((imagesData) => {
        return imagesData.profiles[0].file_path;
      })
    );
  }

  getActor(actorId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.access_token}`,
    });
  
    const actor = this.http.get<any>(`${this.apiUrl}/${actorId}?language=fr`, { headers });
    
    return forkJoin([actor, this.getActorImage(actorId)]).pipe(
      map(([creditsData, actorImagePath]) => {
        const castMember: CastMember = {
          ...creditsData,
          picture_path: actorImagePath
        };     
        return castMember;
      })
    );
  }

  getFilmography(actorId: string) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.access_token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/${actorId}/movie_credits?language=fr`, { headers })
  }

}
