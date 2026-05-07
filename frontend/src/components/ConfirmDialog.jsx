/**
 * Diálogo de confirmación para acciones destructivas (eliminar).
 * Se muestra como un modal centrado con botones de confirmar/cancelar.
 */
export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">

        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Confirmar eliminación
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{message}</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors text-sm font-medium"
          >
            Eliminar
          </button>
        </div>

      </div>
    </div>
  );
}
