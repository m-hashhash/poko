import { Box, Skeleton, styled } from '@mui/material';

const PokemonCardsWrapper = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '69px 0',
  justifyContent: 'center',
  gap: 23
}));

export default function PokemonsLoadingScreen() {
  return (
    <PokemonCardsWrapper>
      {new Array(20).fill(0).map((_, index) => (
        <Skeleton variant='rounded' key={index} sx={{ width: '232.200px', height: '311.988px' }}></Skeleton>
      ))}
    </PokemonCardsWrapper>
  );
}
