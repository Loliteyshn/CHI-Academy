import { Box, Typography } from "@mui/material"
import { ExhibitType } from "../types/Exhibits";
import { ExhibitsActions } from "./ExhibitsActions";

export const Exhibit = ({ exhibit, refresh }: { exhibit: ExhibitType, refresh: () => void }) => {
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

            <ExhibitsActions exhibit={exhibit} refresh={refresh} />

        </Box>
    )
}