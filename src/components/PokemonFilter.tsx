import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material';
import { ChangeEventHandler, useDeferredValue, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PokemonFilterRoot = styled('form')(({ theme }) => ({
  borderRadius: 4,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& .MuiInputBase-root': {
      marginLeft: 0
    }
  }
}));

export default function PokemonFilter() {
  const router = useRouter();
  const [filter, setFilter] = useState('');

  const debouncedFilter = useDeferredValue(filter);

  const handleFilter: ChangeEventHandler<HTMLInputElement> = evt => {
    setFilter(evt.target.value);
  };

  useEffect(() => {
    if (router.isReady) {
      router.push('/?page=1&s=' + debouncedFilter).then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter]);

  useEffect(() => {
    if (router.isReady && router.query?.s) {
      setFilter((router.query?.s as string) ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <PokemonFilterRoot
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
        mx: 'auto',
        mt: '51px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1), -5px -5px 5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, pr: '12px' }}
        placeholder='Filter by name or id (ex. Venusaur)'
        inputProps={{ 'aria-label': 'PokemonFilter by name or id (ex. Venusaur)' }}
        value={filter}
        onChange={handleFilter}
      />
    </PokemonFilterRoot>
  );
}
