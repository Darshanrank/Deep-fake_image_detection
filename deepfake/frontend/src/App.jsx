import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detect from './pages/Detect';
import About from './pages/About';
import AuthPage from './pages/AuthPage';  // Combined Login/SignUp Page
import ProtectedRoute from './components/ProtectedRoute';  // New Protected Route Component
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-900">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        {/* Auth Route */}
                        <Route path="/auth" element={<AuthPage />} />

                        {/* Protected Routes */}
                        <Route 
                            path="/" 
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/detect" 
                            element={
                                <ProtectedRoute>
                                    <Detect />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/about" 
                            element={
                                <ProtectedRoute>
                                    <About />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
