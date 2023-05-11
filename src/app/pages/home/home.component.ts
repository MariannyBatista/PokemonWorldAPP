import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

pokemons:Pokemon[]=[];
siguiente = 0;
atras = 0;
btnActive=true;
idPokemon=0;

  constructor(private pokemonSvc:PokemonService, private router:Router) { }

  ngOnInit(): void {

    localStorage.removeItem('valor');

    this.pokemonSvc.getPokemons().subscribe(res=>{

      this.pokemons = res;

    })
  }

  onClickPokemon(nombre:string){

    this.pokemonSvc.getPokemonDetails(nombre).subscribe(pokemom=>{
      this.router.navigate(['/pokemon', pokemom.name])
    })

  }

  paginaSiguiente(){
    this.siguiente=21;
    this.pokemonSvc.getPaginacionSiguiente(this.siguiente).subscribe(res=>{
      this.pokemons = res;
    })
    this.btnActive=false;
    localStorage.removeItem('valor');
  }

  paginaAtras(){
    this.atras=21;
    this.pokemonSvc.getPaginacionAtras(this.atras).subscribe(res=>{
      this.pokemons = res;

      if(localStorage.getItem('valor')==='detener'){
        this.btnActive=true;
      }
    })
  }

  deletePokemon(id: string) {
    this.pokemonSvc.deletePokemon(id);
  }
}
