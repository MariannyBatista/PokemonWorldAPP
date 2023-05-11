import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { SearchComponent } from './pages/search/search.component';


const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'pokemon/:nombre',component: PokemonComponent},
  {path: 'buscar/:texto', component: SearchComponent},

  {path: '', pathMatch:'full', redirectTo:'/home'},
  {path: '**',pathMatch:'full', redirectTo: 'home' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
