import { RouterModule, Routes } from '@angular/router';
import { SingleMovieComponent } from './Components/singleMovie/singleMovie.component';
import { HomeComponent } from './Components/home/home.component';
import { PageNotFoundComponent } from './Components/pageNotFound/pageNotFound.component';
import { TopRatedMoviesComponent } from './Components/topRatedMovies/topRatedMovies.component';
import { ActorComponent } from './Components/actor/actor.component';
import { PopularMovies } from './Components/popularMovies/popularMovies.component';
import { AccountComponent } from './Components/account/account.component';
import { LoginComponent } from './Components/login/login.component';
import { NgModule } from '@angular/core';
import { authGuard } from './core/auth.guard';
import { ContactComponent } from './Components/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'movie/:id', component: SingleMovieComponent, canActivate: [authGuard] },
  { path: 'actor/:id', component: ActorComponent, canActivate: [authGuard] },
  { path: 'top-rated-movies', title: 'Les meilleurs films', component: TopRatedMoviesComponent, canActivate: [authGuard] },
  { path: 'popular-movies', title: 'Les films les plus populaires', component: PopularMovies, canActivate: [authGuard] },
  { path: '**', title: 'Page non existante', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }