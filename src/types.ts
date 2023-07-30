export type Pokemon = {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { other: { 'official-artwork': { front_default: string } } };
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  base_experience: string;
  stats: { base_stat: number; stat: { name: string } }[];
};

export type PokemonApiResponse = {
  count: number;
  results: Pokemon[];
};
