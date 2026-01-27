import AppBar from "@mui/material/AppBar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useThemeMode } from "../providers/ThemeProvider";
import { MaterialUISwitch } from "./ThemeSwitcher";

export const Header: React.FC = () => {
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