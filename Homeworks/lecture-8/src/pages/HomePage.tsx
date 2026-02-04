import { Box, Typography } from "@mui/material"
import { useRequest } from "ahooks"
import { fetchMyExhibits } from "../api/exhibitActions"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import PaginationControlled from "../components/Pagination"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { Exhibit } from "../components/Exhibit"

export const HomePage = () => {
    let [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(() => Number(searchParams.get('page') || 1));
    const { data, loading, error, refresh } = useRequest(() => fetchMyExhibits(page), { refreshDeps: [page] });

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
                            <Exhibit key={item.id} exhibit={item} refresh={refresh} />
                        ))
                }
            </Box>

        </Box>
    )
}