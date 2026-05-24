import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from './AdminLayout';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { ResourceList } from './ResourceList';
import { ResourceEditor } from './ResourceEditor';

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path=":resource" element={<ResourceList />} />
            <Route path=":resource/:id" element={<ResourceEditor />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
