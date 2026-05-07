import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

/**
 * Proveedor del tema global (oscuro / claro).
 * Persiste la preferencia en localStorage.
 */
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Leer preferencia guardada o usar preferencia del sistema
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Aplicar clase al elemento raíz para que Tailwind active el modo oscuro
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Hook para consumir el contexto de tema fácilmente. */
export const useTheme = () => useContext(ThemeContext);
