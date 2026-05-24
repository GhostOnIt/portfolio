import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LangLayout } from './components/LangLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import Blog from './pages/Blog';
import CaseStudies from './pages/CaseStudies';
import { Contact } from './pages/Contact';
import { AuthProvider } from './admin/AuthContext';
import { ProtectedRoute } from './admin/ProtectedRoute';
import { AdminLayout } from './admin/AdminLayout';
import { Login } from './admin/Login';
import { Dashboard } from './admin/Dashboard';
import { ResourceList } from './admin/ResourceList';
import { ResourceEditor } from './admin/ResourceEditor';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          }
        >
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path=":resource" element={<ResourceList />} />
              <Route path=":resource/:id" element={<ResourceEditor />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blog" element={<Blog />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
