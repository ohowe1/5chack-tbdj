import { Navigate, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from '../context/AuthContext';

// Simple fallback loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    <span className="ml-3">Loading...</span>
  </div>
);

// LazyRoute wrapper for route-level code splitting
export const LazyRoute = ({ component: Component, ...props }: { component: React.ComponentType<unknown>; [key: string]: unknown }) => {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// ProtectedRoute component that checks auth and renders child routes via Outlet
export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingFallback />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  );
};



