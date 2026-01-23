import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { FormControlLabel } from '@mui/material';
import { MaterialUISwitch } from './ThemeSwitcher';
import { useThemeMode } from '../providers/ThemeProvider';

export const Header = () => {
    const { mode, toggleTheme } = useThemeMode();

    return <AppBar position="fixed" sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'primary.main',
        color: 'text.primary'
    }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap component="div">
                Clipped drawer
            </Typography>

            <FormControlLabel
                control={
                    <MaterialUISwitch
                        sx={{ m: 1 }}
                        checked={mode === 'light'}
                        onChange={toggleTheme}
                    />
                }
                label=""
            />
        </Toolbar>
    </AppBar>
}