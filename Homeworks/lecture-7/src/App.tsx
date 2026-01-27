import React from 'react';
import { ThemeContextProvider } from './providers/ThemeProvider';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AppLayout } from './layouts/AppLayout';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { HeroesPage } from './pages/HeroesPage';
import { HeroDetails } from './components/HeroDetails';

function App() {
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
  )
}

export default App;
