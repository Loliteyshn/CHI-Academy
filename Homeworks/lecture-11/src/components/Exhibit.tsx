'use client';

import { ExhibitType } from "@/interfaces/Exhibit"
import { Box, Typography } from "@mui/material"
import { ExhibitsActions } from "./ExhibitsActions"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const Exhibit = ({ exhibit }: { exhibit: ExhibitType }) => {
    const router = useRouter();

    const onCommentChanged = () => {
        router.refresh();
    };
    
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
                mb: 3,
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
                    {exhibit.createdAt}
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

            <Link href={`/post/${exhibit.id}`}>
                <Typography variant="body1">
                    {exhibit.description}
                </Typography>
            </Link>

            <ExhibitsActions exhibit={exhibit} onCommentChanged={onCommentChanged} />

        </Box>
    )
}