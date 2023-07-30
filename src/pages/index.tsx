import Head from 'next/head';
import { Box, Container, styled, Typography } from '@mui/material';
import LogoIcon from '@/src/icons/LogoIcon';
import PokemonFilter from '@/src/components/PokemonFilter';
import { useGetPokemonsQuery } from '@/src/slices/pokemonApi';
import Pagination from '@/src/components/Pagination';
import { useRouter } from 'next/router';
import PokemonList from '@/src/components/PokemonList';
import PokemonsLoadingScreen from '@/src/components/PokemonsLoadingScreen';
import PokemonDetailsDialog from '@/src/components/PokemonDetailsDialog';

const Logo = styled(LogoIcon)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 'fit-content !important'
  }
}));

const Layout = styled(Box)(() => ({
  display: 'grid',
  justifyContent: 'center',
  marginTop: 69
}));

export default function Home() {
  const router = useRouter();

  const { data, isLoading, isFetching, isError } = useGetPokemonsQuery(router.query, {
    refetchOnFocus: false,
    skip: !router.isReady
  });

  const pages = Math.ceil((data?.count ?? 0) / 20);

  return (
    <>
      <Head>
        <title>Pokemon App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <PokemonDetailsDialog />
        <Layout>
          <Logo sx={{ mx: 'auto' }} />
          <PokemonFilter />
          {isError ? (
            <Typography align='center'>An Error has occurred please try again later</Typography>
          ) : (
            <>
              {isFetching ? <PokemonsLoadingScreen /> : <PokemonList results={data?.results ?? []} />}
              {!isLoading && data?.results.length ? (
                <Pagination count={pages} isLoading={isFetching} />
              ) : (
                data?.results.length == 0 && (
                  <Typography align='center'>No pokemon was found with for `{router.query.s ?? ''}`</Typography>
                )
              )}
            </>
          )}
        </Layout>
      </Container>
    </>
  );
}