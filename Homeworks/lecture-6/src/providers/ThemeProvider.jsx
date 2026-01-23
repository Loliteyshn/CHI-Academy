import { useState, useEffect } from "react";
import { createContext } from "react";
import { darkTheme, lightTheme } from "../theme/theme";
import { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext(undefined);

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    const toggleTheme = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    const theme = mode === 'light' ? lightTheme : darkTheme;

    return <ThemeContext.Provider value={{ mode, toggleTheme }}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ThemeContext.Provider>
}

export const useThemeMode = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeContextProvider');
    return context;
}