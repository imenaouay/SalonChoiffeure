import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Book from './pages/Book';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AnimatedTransition from './components/AnimatedTransition';
import { useAuth } from './store/auth';

export default function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <AnimatedTransition>
                    <Home />
                  </AnimatedTransition>
                }
              />
              <Route
                path="/book"
                element={
                  <AnimatedTransition>
                    <Book />
                  </AnimatedTransition>
                }
              />
              <Route
                path="/profile"
                element={
                  <AnimatedTransition>
                    <Profile />
                  </AnimatedTransition>
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated && user?.role === 'admin' ? (
                    <AnimatedTransition>
                      <Dashboard />
                    </AnimatedTransition>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </Router>
  );
}