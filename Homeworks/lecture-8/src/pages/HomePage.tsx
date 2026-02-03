import { Box, Typography } from "@mui/material"
import { useRequest } from "ahooks"
import { fetchMyExhibits } from "../api/exhibitActions"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"

export const HomePage = () => {
    let [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(() => Number(searchParams.get('page') || 1));
    const {data, loading, error} = useRequest(() => fetchMyExhibits(page), {refreshDeps: [page]});

    console.log(data);
    

    return (
        <Box>
            {data?.data.map((item: any) => (
                <Typography>{item.description}</Typography>
            ))}
        </Box>
    )
}