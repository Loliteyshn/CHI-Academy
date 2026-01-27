import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        surfaceAlt: string;
    }

    interface PaletteOptions {
        surfaceAlt?: string;
    }
}
