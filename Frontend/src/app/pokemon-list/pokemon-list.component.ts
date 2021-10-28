import { Component, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  listaPokemon: Array<any> = [];
  isLoading: boolean = false;
  dataSource: any;
  pokemonToDisplay = ['N°', 'Nombre', 'Tipo', 'Salud', 'Ataque', 'Defensa'];
  expandedElement: Pokemon | null | undefined;

  subscriptions: Subscription[] = [];

  imgRout: string = "https://cdn.traction.one/pokedex/pokemon";
  mode: string = "tv";

  constructor(private servService: ServiceService) { }


  get pokemons(): any[] {
    return this.servService.pokemons;
  }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }


  ngOnInit(): void {
    this.testServ();
    // Trae todos pokemons de PokeApi
    if (!this.pokemons.length) {
      this.loadMore();
    }
  }

  loadMore(): void {
    this.isLoading = true;
    this.subscription = this.servService.getNext().subscribe(response => {
      this.isLoading = false;
      this.servService.next = response.next;
      const pokeList = response.results.map((i: any) => this.servService.get(i.name));
      this.subscription = concat(...pokeList).subscribe((response: any) => {
        this.servService.pokemons.push(response)
      })
    }, error => console.log('Error Occurred:', error), () => this.isLoading = false);
  }

  modeImg(mode: string) {
    switch (mode) {
      case "tv":
        this.mode = "tv";
        this.imgRout = "https://cdn.traction.one/pokedex/pokemon";
        break;
      case "game":
        this.mode = "game";
        this.imgRout = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
        break;
      case "3d":
        this.mode = "3d";
        break;
  
      default:
        break;
    }
  }

  testServ(){
    this.servService.test().subscribe(resp => console.log(resp))
  }
}
