import Box from "@mui/material/Box"
import { useParams } from "react-router-dom"
import { Typography } from "@mui/material";
import { useRequest } from "ahooks";
import { getHeroById } from "../api/api";

export const HeroDetails: React.FC = () => {
    const { id } = useParams();
    const { data: hero, loading, error } = useRequest(() => getHeroById(id), {
        refreshDeps: [id]
    })

    if (loading) return <Typography sx={{ textAlign: 'center', mt: 4 }}>Loading...</Typography>
    if (error) return <Typography sx={{ textAlign: 'center', mt: 4, color: 'error.main' }}>Error occur: {error.message}</Typography>

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
                src={hero?.image}
                alt={hero?.name}
                sx={{
                    width: '80%',
                    maxWidth: 300,
                    borderRadius: 2,
                    mb: 2,
                }}
            />

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                {hero?.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5, color: 'text.secondary' }}>
                Gender: {hero?.gender}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Status: {hero?.status}
            </Typography>
        </Box>
    )
}
