'use client';

import { Box, Typography } from "@mui/material"
import { useRequest } from "ahooks"
import { LoadingSpinner } from "./LoadingSpinner"
import { Comment } from "./Comment"
import { fetchComments } from "../actions/commentActions"
import { AddComment } from "./AddComment"

interface CommentsType {
    exhibitId: number
    onCommentChanged: () => void
}

export const CommentStripe = ({ exhibitId, onCommentChanged }: CommentsType) => {
    const { data, loading, error, refresh } = useRequest(() => fetchComments(exhibitId), { refreshDeps: [exhibitId] });

    const handleRefresh = () => {
        refresh();
        onCommentChanged();
    }

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 600,
                p: 1,
            }}
        >
            {loading ? <LoadingSpinner />
                : error
                    ? <Typography>Error occur: {error.message}</Typography>
                    : <Box>
                        <Box sx={{
                            overflowY: 'auto',
                            maxHeight: 300,
                            p: 2,
                            mt: 2,
                            border: '1px solid #e0e0e0',
                        }}>
                            {data?.length === 0 ? <Typography sx={{ p: 2 }}>No Comments</Typography>
                                : data?.map((comment) => (
                                    <Comment key={comment.id} comment={comment} exhibitId={exhibitId} refresh={handleRefresh} />
                                ))}
                        </Box>
                        <AddComment refresh={handleRefresh} exhibitId={exhibitId} />
                    </Box>
            }
        </Box>
    )
}