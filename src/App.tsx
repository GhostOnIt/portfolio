import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LangLayout } from './components/LangLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import Blog from './pages/Blog';
import CaseStudies from './pages/CaseStudies';
import { Contact } from './pages/Contact';
import './App.css';

const AdminApp = lazy(() => import('./admin/AdminApp'));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
                  Loading…
                </div>
              }
            >
              <AdminApp />
            </Suspense>
          }
        />

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
