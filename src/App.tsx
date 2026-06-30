
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store';
import { queryClient } from './lib/queryClient';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
    </ErrorBoundary>
  );
}

export default App;
