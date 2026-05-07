import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Barra de navegación principal.
 * Muestra el logo, links activos y el toggle de tema.
 */
export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/contactos', label: 'Contactos' },
    { to: '/localidades', label: 'Localidades' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
            <span className="text-2xl">📒</span>
            <span className="hidden sm:block">LibretaApp</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${location.pathname === to
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                {label}
              </Link>
            ))}

            {/* Toggle tema */}
            <button
              onClick={toggleTheme}
              title={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              className="ml-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-lg"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
