import { Box, Typography } from "@mui/material"
import { useRequest } from "ahooks"
import { LoadingSpinner } from "./LoadingSpinner"
import { Comment } from "./Comment"
import { fetchComments } from "../api/commentsActions"

interface CommentsType {
    exhibitId: number
}

export const CommentsStripe = ({ exhibitId }: CommentsType) => {
    const { data, loading, error } = useRequest(() => fetchComments(exhibitId), { refreshDeps: [exhibitId] });    

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 600,
                maxHeight: 300,
                overflowY: 'auto',
                pr: 1.5,
                mt: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
            }}
        >
            {loading ? <LoadingSpinner />
                : error
                    ? <Typography>Error occur: {error.message}</Typography>
                    : <Comment comments={data} />
            }
        </Box>
    )
}