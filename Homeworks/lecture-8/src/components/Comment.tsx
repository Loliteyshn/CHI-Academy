import { Box, Typography } from "@mui/material"
import { CommentsResponseType } from "../types/Exhibits"

interface CommentType {
    comments: CommentsResponseType[] | undefined
}
export const Comment = ({ comments }: CommentType) => {
    return <>
        {comments?.length == 0 ? <Typography sx={{ p: 2 }}>No Comments</Typography>
            : comments?.map(comment => (
                <Box
                    key={comment.id}
                    sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        bgcolor: '#fafafa',
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1,
                        }}
                    >
                        <Typography fontWeight={600}>
                            {comment.user.username}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            {new Date(comment.createdAt).toLocaleString()}
                        </Typography>
                    </Box>

                    <Typography>{comment.text}</Typography>
                </Box>
            ))}
    </>
}