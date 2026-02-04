import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { StipePage } from './pages/StipePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { AuthGuard } from './components/AuthGuard';
import { HomePage } from './pages/HomePage';
import { AppLayout } from './layouts/AppLayout';
import { NewPost } from './pages/NewPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route element={<AppLayout />}>
          <Route path='/:page?' element={<StipePage />} />

          <Route element={<AuthGuard />}>
            <Route path='/home/:page?' element={<HomePage />} />
            <Route path='new-post' element={<NewPost />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
