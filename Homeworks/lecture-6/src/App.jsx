import './styles.css';
import logo from './assets/react.svg';
import { useState } from 'react';
import { ThemeContextProvider } from './providers/ThemeProvider';
import { AppLayout } from './layouts/AppLayout';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router";
import HomePage from './pages/HomePage';
import HeroesPage from './pages/HeroesPage';
import { HeroDetails } from './components/HeroDetails';
import AboutPage from './pages/AboutPage';


export default function App() {

    return (
        <ThemeContextProvider>
            <Router>
                <AppLayout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/heroes" element={<HeroesPage />} >
                            <Route path=':id' element={<HeroDetails />} />
                        </Route>
                        <Route path='/about' element={<AboutPage />} />
                    </Routes>
                </AppLayout>
            </Router>
        </ThemeContextProvider>
    );
}
