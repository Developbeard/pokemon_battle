import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { PokeAPI, Pokemon, PokemonDetails } from '../model/pokemon.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseApi = environment.baseAPI;
  basePoke = environment.basePoke

  private url: string = environment.basePoke + 'pokemon/';
  private _pokemons: any[] = [];
  private _next: string = '';

  constructor(private http: HttpClient ) {

  }

  get pokemons(): any[] {
    return this._pokemons;
  }
  
  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }


  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  get(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get<any>(url);
  }

  getNext(): Observable<any> {
    const url = this.next === '' ? `${this.url}?limit=151` : this.next;
    return this.http.get<any>(url);
  }

  getEvolution(id: number): Observable<any> {
    const url = `${environment.basePoke}evolution-chain/${id}`;
    return this.http.get<any>(url);
  }

  getSpecies(name: string): Observable<any> {
    const url = `${environment.basePoke}pokemon-species/${name}`;
    return this.http.get<any>(url);
  }

  test(): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set("x-rapidapi-host", "pokemon-go1.p.rapidapi.com").set("x-rapidapi-key", "863ae5a8ffmsh1a6c7cd3815fc35p153935jsnc0eb13942dcb").set("useQueryString", "true")
    return this.http.get<any>("https://pokemon-go1.p.rapidapi.com/alolan_pokemon.json", {headers: headers}); 
  }


}
