import { Box, Collapse, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ExhibitType } from "../types/Exhibits";
import { useState } from "react";
import { CommentsStripe } from "./CommentStripe";

export const Exhibit = ({ exhibit }: { exhibit: ExhibitType }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 600,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                p: 2,
                bgcolor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography fontWeight={600}>
                    {exhibit.user.username}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    {new Date(exhibit.createdAt).toLocaleDateString()}
                </Typography>
            </Box>

            <Box
                component="img"
                src={exhibit.imageUrl}
                alt="post"
                sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 400,
                    objectFit: 'cover',
                    borderRadius: 2,
                }}
            />

            <Typography variant="body1">
                {exhibit.description}
            </Typography>

            <Box onClick={() => setIsOpen((v) => !v)}
                sx={{
                    backgroundColor: 'secondary.main',
                    p: 1,
                    borderRadius: 2,
                    color: '#fff'
                }}>
                <Typography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                    }}
                >
                    Comments: {exhibit.commentCount}
                    <KeyboardArrowDownIcon />
                </Typography>
            </Box>

            <Collapse in={isOpen}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <CommentsStripe exhibitId={exhibit.id} />
                </Box>
            </Collapse>
        </Box>
    )
}