import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRequest } from 'ahooks';
import { fetchExhibits } from '../api/exhibitActions';
import { ExhibitsResponseType } from '../types/Exhibits';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

interface PaginationType {
    page: string
    setPage: Dispatch<SetStateAction<number>>
    totalPages?: number
    setSearchParams: SetURLSearchParams
}

export default function PaginationControlled({ page, setPage, totalPages, setSearchParams }: PaginationType) {
    useEffect(() => {
        setSearchParams({ page });
    }, [page])

    return (
        <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={totalPages}
                page={Number(page)}
                onChange={(e, value) => setPage(Number(value))} />
        </Stack>
    );
}
