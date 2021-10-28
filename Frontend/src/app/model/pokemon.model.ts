export class TYPE_COLOURS {
    bug = 'B1C12E';
    dark = '4F3A2D';
    dragon = '755EDF';
    electric = 'F8D030';
    fairy = 'F4B1F4';
    fighting = '82351D';
    fire = 'E73B0C';
    flying = 'A3B3F7';
    ghost = '6060B2';
    grass = '74C236';
    ground = 'D3B357';
    ice = 'A3E7FD';
    normal = 'C8C4BC';
    poison = '934594';
    psychic = 'ED4882';
    rock = 'B9A156';
    steel = 'B5B5C3';
    water = '3295F6';
  static type: string;
  }
  

export interface Abilities{
    normal: string;
    hidden: string;
}

export interface Family{
    id: number;
    evolutionStage: number;
    evolutionLine: Array<string>;
}

export interface Pokemon {
    number: number;
    name: string;
    species: string;
    type: Array<string>;
    image: string;
    abilities: Abilities[];
    height: string;
    weight: string;
    family: Family[];
    starter: boolean;
    legendary: boolean;
    mythical: boolean;
    ultraBeast: boolean;
    mega: boolean;
    description: string;
}

export interface Results {
    name: string;
    url: string;
    id?: string;
    details?: PokemonDetails;
    description?: string;
  }
  
  export interface PokeAPI {
    count: number;
    next: string;
    results: Results[];
  }
  
  export interface PokemonDetails {
    name: string;
    id: number;
    sprites: Sprites;
    abilities?: Array<any>;
    types?: Array<any>;
  }

  export interface Sprites {
    front_default: string;
  }