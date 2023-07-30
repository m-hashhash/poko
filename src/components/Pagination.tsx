import * as React from 'react';
import PaginationDefault from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router';

interface PaginationProps {
  count: number;
  isLoading: boolean;
}

export default function Pagination(props: PaginationProps) {
  const router = useRouter();

  // if (!router.isReady) return;

  return (
    <Stack spacing={2} sx={{ mx: 'auto', mb: '69px' }}>
      <PaginationDefault
        disabled={props.isLoading}
        page={parseInt((router.query?.page as string) ?? '1')}
        count={props.count}
        renderItem={item => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
        onChange={async (evt, page) => {
          const search = router.query?.s ?? '';
          await router.push('/?page=' + page + '&s=' + search, undefined, {
            scroll: false
          });
        }}
      />
    </Stack>
  );
}
