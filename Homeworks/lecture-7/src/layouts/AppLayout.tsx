import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "../components/Header";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Sidebar } from "../components/Sidebar";

export const AppLayout = ({ children }: {children: React.ReactNode}) => {

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