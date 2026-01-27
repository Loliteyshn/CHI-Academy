import { createTheme } from '@mui/material/styles';
import '@mui/x-data-grid/themeAugmentation';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#3B82F6' },
        secondary: { main: '#8B5CF6' },
        background: { default: '#F4F6F8', paper: '#FFFFFF' },
        surfaceAlt: '#E5E7EB',
        text: { primary: '#1E293B', secondary: '#475569' },
        error: { main: '#EF4444' },
        success: { main: '#22C55E' },
        warning: { main: '#F59E0B' },
        info: { main: '#0EA5E9' },
        divider: '#CBD5E1',
    },
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: { backgroundColor: "#FFFFFF" },
                columnHeader: { backgroundColor: "#3B82F6", color: '#F4F6F8' },
                columnHeaderCheckbox: {
                    '& .MuiCheckbox-root': {
                        color: '#F4F6F8',
                    },
                },
            },
        },
    },
});


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#2563EB' },
        secondary: { main: '#9333EA' },
        background: { default: '#0F172A', paper: '#1E293B' },
        surfaceAlt: '#273449',
        text: { primary: '#E2E8F0', secondary: '#94A3B8' },
        error: { main: '#F87171' },
        success: { main: '#4ADE80' },
        warning: { main: '#FBBF24' },
        info: { main: '#3B82F6' },
        divider: '#334155',
    },
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: { backgroundColor: "#1E293B" },
                columnHeader: { backgroundColor: "#2563EB", color: '#F4F6F8', },
                columnHeaderCheckbox: {
                    '& .MuiCheckbox-root': {
                        color: '#F4F6F8',
                    },
                },
                columnSeparator: { color: "#F4F6F8" }
            },
        },
    },
});
