import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contactos from './pages/Contactos';
import Localidades from './pages/Localidades';

/**
 * Componente raíz de la aplicación.
 * Envuelve todo con los providers de Tema y Toasts,
 * y configura el enrutamiento con React Router.
 */
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          {/* Fondo adaptable al tema */}
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/contactos"   element={<Contactos />} />
              <Route path="/localidades" element={<Localidades />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
