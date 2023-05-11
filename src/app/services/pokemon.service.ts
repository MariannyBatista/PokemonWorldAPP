import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonsResponse } from '../interfaces/pokemons.interface';
import { PokemonDetails } from '../interfaces/pokemon.interface';
import { Habilidades } from '../interfaces/habilidades.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseURL:string = 'https://pokeapi.co/api/v2';
  private limitPage = 21;
  public offsetPage = 0;
  public id=0;

  constructor(private http:HttpClient) { }

  get params() {
    return {
      limit: this.limitPage,
      offset: this.offsetPage,
    };
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<PokemonsResponse>(`${this.baseURL}/pokemon`, {
        params: this.params,
      }).pipe(map((res) => res.results));
  }

  getPokemonDetails(nombre:string):Observable<PokemonDetails>{
    return this.http.get<PokemonDetails>(`${this.baseURL}/pokemon/${nombre}`)

  }

  getPokemonHabilidades(url:string):Observable<Habilidades>{

    return this.http.get<Habilidades>(`${url}`);

  }

  getPaginacionSiguiente(siguiente:number){

    this.offsetPage = this.offsetPage + siguiente
    return this.http.get<PokemonsResponse>(`https://pokeapi.co/api/v2/ability/?limit=21&offset=${this.offsetPage}
    `).pipe(map(res=>res.results))

  }

  getPaginacionAtras(atras:number){

    this.offsetPage = this.offsetPage - atras;
    if (this.offsetPage === 0){
      localStorage.setItem('valor', 'detener')
    }
    return this.http.get<PokemonsResponse>(`https://pokeapi.co/api/v2/ability/?limit=21&offset=${this.offsetPage}
    `).pipe(map(res=>res.results))

  }

  deletePokemon(id: string) {
    this.http.delete(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe(() => {
     
    });
  }

}
