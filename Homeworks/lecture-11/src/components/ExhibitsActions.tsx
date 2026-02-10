'use client';

import { Box, Collapse, IconButton } from "@mui/material"
import { CommentStripe } from "./CommentStripe"
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ExhibitType } from "../interfaces/Exhibit";
import { deleteExhibit } from "../actions/exhibitActions";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";

export const ExhibitsActions = ({ exhibit, onCommentChanged }: { exhibit: ExhibitType, onCommentChanged: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isOwner = useSelector((state: RootState) => state.users.userId === exhibit.user.id);
    const router = useRouter();
    // const [commentCount, setCommentCount] = useState(exhibit.commentCount);

    const { run: runDelete } = useRequest((id) => deleteExhibit(id), {
        manual: true,
        onSuccess: () => {
            router.refresh();
            onCommentChanged();
        },
        onError: (error) => console.error('Failed to delete exhibit:', error),
    });

    //  const handleCommentAdded = () => {
    //     setCommentCount(prev => prev + 1);
    // };

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
                    <CommentStripe exhibitId={exhibit.id} onCommentChanged={onCommentChanged} />
                </Box>
            </Collapse>

        </Box>
    )
}
