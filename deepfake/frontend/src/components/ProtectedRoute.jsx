import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';  // New spinner component

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;  // Show spinner while processing
    }

    return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
