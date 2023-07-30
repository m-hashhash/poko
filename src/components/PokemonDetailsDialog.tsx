import { Box, Chip, Dialog, DialogContent, Tooltip } from '@mui/material';
import useDialogsSelector from '@/src/hooks/useDialogsSelector';
import { dialogsActions } from '@/src/slices/dialogs';
import { DIALOG_IDS } from '@/src/constants';
import { useAppDispatch } from '@/src/store';
import {
  PokemonCardProps,
  PokemonDetails,
  PokemonId,
  PokemonImageWrapper,
  PokemonName,
  PokemonStat,
  PokemonType
} from '@/src/components/PokemonCard';
import Image from 'next/image';

export default function PokemonDetailsDialog() {
  const dispatch = useAppDispatch();
  const {
    [DIALOG_IDS.POKEMON_DETAILS]: { show, details }
  } = useDialogsSelector();

  const info = details as PokemonCardProps;

  return (
    <Dialog
      open={show}
      onClose={() => {
        dispatch(dialogsActions.closeDialog(DIALOG_IDS.POKEMON_DETAILS));
      }}
      maxWidth='xs'
    >
      <DialogContent sx={{ width: 'min(450px, 100%)', p: '24px' }}>
        <PokemonImageWrapper sx={{ width: '100%' }}>
          {info?.imageUrl && (
            <Image src={info?.imageUrl} alt='pokemon image' fill sizes='@media(min-width: 10vw)' priority />
          )}
          <PokemonId>{info?.id}</PokemonId>
        </PokemonImageWrapper>
        <PokemonDetails>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tooltip title={info?.name ?? 'Unknown'} placement='left' arrow>
              <PokemonName>{info?.name ?? 'Unknown'}</PokemonName>
            </Tooltip>
            <PokemonType>{info?.type}</PokemonType>
          </Box>
          <PokemonStat>{info?.type} Pokémon</PokemonStat>
          <Box sx={{ mt: '20px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {info?.height ? <Chip label={`Height: ${info?.height}`} /> : <></>}
            {info?.weight ? <Chip label={`Weight: ${info?.weight}`} /> : <></>}
            {info?.base_experience ? <Chip label={`Base Experience: ${info?.base_experience}`} /> : <></>}
            {info?.abilities ? (
              info.abilities.map(({ ability }, index) => <Chip key={index} label={`Abilty: ${ability.name}`} />)
            ) : (
              <></>
            )}
            {info?.stats ? (
              info.stats.map(({ stat, base_stat }, index) => (
                <Chip key={index} label={`Stat: ${stat.name} and Base: ${base_stat ?? 0}`} />
              ))
            ) : (
              <></>
            )}
          </Box>
        </PokemonDetails>
      </DialogContent>
    </Dialog>
  );
}
