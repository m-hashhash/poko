import PokemonCard from '@/src/components/PokemonCard';
import { Box, styled } from '@mui/material';
import { PokemonApiResponse } from '@/src/types';

const PokemonCardsWrapper = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '69px 0',
  justifyContent: 'center',
  gap: 23
}));

interface PokemonListProps {
  results: PokemonApiResponse['results'];
}

export default function PokemonList(props: PokemonListProps) {
  return (
    <PokemonCardsWrapper>
      {props.results?.map((result, index) => (
        <PokemonCard
          imageUrl={result.sprites.other['official-artwork']?.front_default}
          key={index}
          type={result.types?.[0]?.type?.name ?? 'Unknown'}
          {...result}
        />
      ))}
    </PokemonCardsWrapper>
  );
}
