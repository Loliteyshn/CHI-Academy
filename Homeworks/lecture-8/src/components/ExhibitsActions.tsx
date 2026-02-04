import { Box, Collapse, IconButton } from "@mui/material"
import { CommentsStripe } from "./CommentStripe"
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ExhibitType } from "../types/Exhibits";
import { deleteExhibit } from "../api/exhibitActions";
import { useRequest } from "ahooks";

export const ExhibitsActions = ({ exhibit, refresh }: { exhibit: ExhibitType, refresh: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isOwner = useSelector((state: RootState) => state.users.userId === exhibit.user.id);
    const { run: runDelete } = useRequest((id) => deleteExhibit(id), {
        manual: true,
        onSuccess: () => refresh()
    });

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: 'secondary.main',
                    p: 1,
                    borderRadius: 2,
                    color: '#fff'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                    }}
                >
                    Comments: {exhibit.commentCount}
                    <Box>
                        {isOwner &&
                            <IconButton
                                sx={{
                                    color: '#fff',
                                    p: 0,
                                    ml: 1
                                }}
                                onClick={() => runDelete(exhibit.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                        <IconButton
                            onClick={() => setIsOpen((v) => !v)}
                            sx={{
                                color: '#fff',
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s',
                                p: 0
                            }}
                        >
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    </Box>

                </Box>
            </Box>

            <Collapse in={isOpen}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <CommentsStripe exhibitId={exhibit.id} onCommentAdded={refresh} />
                </Box>
            </Collapse>

        </Box>
    )
}
