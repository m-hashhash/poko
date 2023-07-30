// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonApiResponse } from '@/src/types';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: '/api/pokemons' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPokemons: builder.query({
      query: arg => {
        const page = arg?.page ?? '1';
        const s = arg?.s ?? '';
        return '?offset=' + (page - 1) * (s ? 100 : 20) + '&s=' + s;
      },
      transformResponse(responseData) {
        return responseData as PokemonApiResponse;
      }
    })
  })
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPokemonsQuery } = apiSlice;
