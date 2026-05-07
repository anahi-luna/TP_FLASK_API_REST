import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

let toastId = 0;

/**
 * Proveedor de notificaciones Toast globales.
 * Cada toast se elimina automáticamente después de 4 segundos.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Contenedor de Toasts */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`
              cursor-pointer flex items-start gap-3 px-5 py-4 rounded-xl shadow-2xl
              max-w-sm text-sm font-medium transition-all duration-300 animate-slide-in
              ${toast.type === 'success'
                ? 'bg-emerald-500 text-white'
                : 'bg-red-500 text-white'
              }
            `}
          >
            <span className="text-lg">{toast.type === 'success' ? '✓' : '✕'}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/** Hook para disparar toasts desde cualquier componente. */
export const useToast = () => useContext(ToastContext);
