import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "../components/Header";
import Toolbar from "@mui/material/Toolbar";

export const AppLayout = ({ children }) => {

    return <Box sx={{
        display: 'flex',
        backgroundColor: 'background.default'
    }}>
        <CssBaseline />
        <Header />
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {children}
        </Box>
    </Box>

}