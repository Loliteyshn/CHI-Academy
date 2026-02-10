'use client'

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';


interface PaginationType {
    page: number
    totalPages?: number
}

export default function PaginationControlled({ page, totalPages }: PaginationType) {
    return (
        <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={totalPages}
                page={Number(page)}
                renderItem={(item) => {
                    const isDisabled =
                        (item.type === 'previous' && page === 1) ||
                        (item.type === 'next' && page === totalPages);
                    return <PaginationItem {...item}
                        component={Link}
                        href={`?page=${item.page}`}
                        disabled={isDisabled}
                    />;
                }}
            />
        </Stack>
    );
}
