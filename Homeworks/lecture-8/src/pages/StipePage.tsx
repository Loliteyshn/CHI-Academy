import { useEffect, useState } from "react"
import { fetchExhibits } from "../api/exhibitActions"
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary, Collapse, } from '@mui/material'
import Header from "../components/Header"
import { Exhibit } from "../components/Exhibit"
import PaginationControlled from "../components/Pagination"
import { useSearchParams } from "react-router-dom"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ExhibitsResponseType } from "../types/Exhibits"
import { useRequest } from "ahooks"

export const StipePage = () => {
    let [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(() => Number(searchParams.get('page') || 1));
    const { data, loading, error } = useRequest(() => fetchExhibits(page), { refreshDeps: [page] });

    console.log(data);


    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    py: 4,
                }}
            >
                <PaginationControlled page={page.toString()}
                    setPage={setPage}
                    totalPages={data?.lastPage}
                    setSearchParams={setSearchParams}
                />

                {loading ? <LoadingSpinner />
                    : error
                        ? <Typography>Error occur: {error.message}</Typography>
                        : data?.data.map((item: any) => (
                            <Exhibit key={item.id} exhibit={item} />
                        ))
                }
            </Box>

        </Box>
    )
}