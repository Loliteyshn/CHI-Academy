import { Box, IconButton, Typography } from "@mui/material"
import { CommentsResponseType } from "../interfaces/Exhibit"
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteComment } from "../actions/commentActions";
import { useRequest } from "ahooks";

interface CommentType {
    comment: CommentsResponseType
    exhibitId: number
    refresh: () => void
}
export const Comment = ({ comment, exhibitId, refresh }: CommentType) => {
    const isOwner = useSelector((state: RootState) => state.users.userId === comment.user.id);
    const { run: runDelete } = useRequest((id) => deleteComment(exhibitId, id), {
        manual: true,
        onSuccess: () => refresh()
    });    

    return <Box
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

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
            }}
        >
            <Typography>{comment.text}</Typography>

            {isOwner &&
                <IconButton
                    sx={{
                        color: 'secondary.main',
                        p: 0,
                        ml: 1
                    }}
                    onClick={() => runDelete(comment.id)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        </Box>
    </Box>

}