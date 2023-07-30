import { Box, styled, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { useAppDispatch } from '@/src/store';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import { PokemonApiResponse } from '@/src/types';

const PokemonCardRoot = styled(Box)(({ theme }) => ({
  width: 253,
  border: '11px solid #1D2C5E',
  borderRadius: 16,
  overflow: 'hidden',
  transition: theme.transitions.create('transform'),
  '&:hover': {
    transform: 'scale(1.07)'
  }
}));

export const PokemonImageWrapper = styled(Box)(() => ({
  position: 'relative',
  height: 213,
  overflow: 'hidden',
  background: 'linear-gradient(154deg, #C8FF9C 27.68%, #FFDA7A 74.71%, #78DFFF 100%)'
}));

export const PokemonId = styled(Typography)(() => ({
  position: 'absolute',
  minWidth: 35,
  height: 36,
  borderRadius: 30,
  background: '#374151',
  padding: '8px 4px',
  inset: '12px 12px auto auto',
  fontWeight: 700,
  color: 'white',
  userSelect: 'none',
  fontSize: 14 / 16 + 'rem',
  lineHeight: 20 / 16,
  display: 'grid',
  placeItems: 'center'
}));

export const PokemonDetails = styled(Box)(() => ({
  padding: '15px 21px 40px',
  height: '100%',
  background: '#E5E7EB'
}));

export const PokemonName = styled(Typography)(() => ({
  fontSize: 18 / 16 + 'rem',
  lineHeight: 28 / 18,
  fontWeight: 800,
  color: '#1F2937',
  textTransform: 'capitalize',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}));

export const PokemonType = styled(Typography)(() => ({
  fontSize: 12 / 16 + 'rem',
  lineHeight: 16 / 12,
  fontWeight: 700,
  color: 'white',
  background: '#374151',
  width: 'fit-content',
  padding: '4px 8px',
  borderRadius: 10,
  userSelect: 'none',
  textTransform: 'uppercase'
}));

export const PokemonStat = styled(Typography)(() => ({
  fontSize: 12 / 16 + 'rem',
  lineHeight: 16 / 12,
  fontWeight: 500,
  color: '#6B7280',
  borderRadius: 10,
  textTransform: 'uppercase'
}));

export type PokemonCardProps = PokemonApiResponse['results']['0'] & {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
};

export default function PokemonCard(props: PokemonCardProps) {
  const dispatch = useAppDispatch();

  return (
    <PokemonCardRoot
      onClick={() => {
        dispatch(dialogsActions.showDialog({ id: DIALOG_IDS.POKEMON_DETAILS, details: { ...props } }));
      }}
    >
      <PokemonImageWrapper>
        {props.imageUrl && (
          <Image src={props.imageUrl} alt='pokemon image' fill sizes='@media(min-width: 10vw)' priority />
        )}
        <PokemonId>{props.id}</PokemonId>
      </PokemonImageWrapper>
      <PokemonDetails>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tooltip title={props.name} placement='left' arrow>
            <PokemonName>{props.name}</PokemonName>
          </Tooltip>
          <PokemonType>{props.type}</PokemonType>
        </Box>
        <PokemonStat>{props.type} Pokémon</PokemonStat>
      </PokemonDetails>
    </PokemonCardRoot>
  );
}
