import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habilidades } from 'src/app/interfaces/habilidades.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

nombrePokemon:string='';
imgPokemon:any;
habilidades:any;
descripcionPokemon:any;
especie?:Habilidades;

  constructor(private pokemonSvc:PokemonService, private activatedRoute:ActivatedRoute) {

    const {nombre} = this.activatedRoute.snapshot.params
    
    this.pokemonSvc.getPokemonDetails(nombre).subscribe(pokemon=>{ 
      this.imgPokemon = pokemon.sprites.other?.['official-artwork'].front_default
      this.nombrePokemon = pokemon.name;
      this.habilidades=pokemon.species;

      this.pokemonSvc.getPokemonHabilidades(this.habilidades.url).subscribe((res:Habilidades)=>{
        
        for (let i = 0; i < res.flavor_text_entries.length; i++) {
          const element1 =res.flavor_text_entries[i];

          if (element1.language.name == 'es'){
            this.descripcionPokemon = element1.flavor_text
           
          }
        }

        for (let i = 0; i < res.genera.length; i++) {
          const element2 = res.genera[i];

          if (element2.language.name == 'es') {
            this.especie=element2.genus;

            
          }
          
          }
      })

    })

    
  }

  ngOnInit(): void {
    
  }

  regresar() {
    location.href = 'home';
  }
}
