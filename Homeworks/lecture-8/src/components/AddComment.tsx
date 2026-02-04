import { Box, CircularProgress, IconButton, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { addComment } from "../api/commentsActions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const AddComment = ({ refresh, exhibitId }: { refresh: () => void, exhibitId: number }) => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (!value.trim()) return;
        if (!isAuthenticated) {
            alert("You must be logged in to add a comment.");
            setLoading(false);
            return;
        }

        try {
            await addComment(exhibitId, value);
            setValue("");
            refresh();
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box>
            <Box
                component={'form'}
                onSubmit={handleSubmit}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <TextField fullWidth
                    id="comment"
                    name="comment"
                    label="Comment"
                    multiline
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <IconButton type="submit" sx={{
                    backgroundColor: 'secondary.main',
                    color: '#fff',
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: 'secondary.dark',
                    },
                    ml: 1
                }}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                </IconButton>

            </Box>

        </Box>
    )
}