import Box from "@mui/material/Box"
import { useParams } from "react-router-dom"
import { Typography, Paper } from "@mui/material";
import { useHeroById } from "../hooks/useHeroById";

export const HeroDetails = () => {
    const { id } = useParams();
    const { hero, isLoading, error } = useHeroById(id);

    if (isLoading) return <Typography sx={{ textAlign: 'center', mt: 4 }}>Loading...</Typography>
    if (error) return <Typography sx={{ textAlign: 'center', mt: 4, color: 'error.main' }}>Error occur: {error}</Typography>

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                minHeight: '100vh',
                p: 4,
            }}
        >
            <Box
                component="img"
                src={hero.image}
                alt={hero.name}
                sx={{
                    width: '80%',
                    maxWidth: 300,
                    borderRadius: 2,
                    mb: 2,
                }}
            />

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                {hero.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5, color: 'text.secondary' }}>
                Gender: {hero.gender}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Status: {hero.status}
            </Typography>
        </Box>
    )
}
