import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../context/ToastContext';
import {
  getLocalidades, createLocalidad, updateLocalidad, deleteLocalidad,
} from '../services/api';

// ─── Validaciones con Regex (cliente) ─────────────────────────────────────────
const REGEX_TEXTO = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\.\,\-]+$/;

function validarLocalidad({ nombre, provincia }) {
  const errores = {};
  if (!nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
  else if (!REGEX_TEXTO.test(nombre)) errores.nombre = 'Solo letras y espacios.';
  if (!provincia.trim()) errores.provincia = 'La provincia es obligatoria.';
  else if (!REGEX_TEXTO.test(provincia)) errores.provincia = 'Solo letras y espacios.';
  return errores;
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function Localidades() {
  const { addToast } = useToast();
  const [localidades, setLocalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({ nombre: '', provincia: '' });

  // Estados de modales
  const [modalForm, setModalForm] = useState(false);
  const [editando, setEditando] = useState(null); // null = nuevo
  const [confirmDelete, setConfirmDelete] = useState(null); // id a borrar

  // ─── Carga de datos ────────────────────────────────────────────────────────
  const cargar = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filtros.nombre) params.append('nombre', filtros.nombre);
      if (filtros.provincia) params.append('provincia', filtros.provincia);
      const res = await getLocalidades(`?${params}`);
      setLocalidades(res.data);
    } catch (e) {
      addToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, [filtros]);

  // ─── Guardar (crear o editar) ──────────────────────────────────────────────
  const handleGuardar = async (formData) => {
    try {
      if (editando) {
        await updateLocalidad(editando.id, formData);
        addToast('Localidad actualizada correctamente.');
      } else {
        await createLocalidad(formData);
        addToast('Localidad creada exitosamente.');
      }
      setModalForm(false);
      setEditando(null);
      cargar();
    } catch (e) {
      addToast(e.message, 'error');
    }
  };

  // ─── Eliminar ──────────────────────────────────────────────────────────────
  const handleEliminar = async () => {
    try {
      await deleteLocalidad(confirmDelete);
      addToast('Localidad eliminada correctamente.');
      setConfirmDelete(null);
      cargar();
    } catch (e) {
      addToast(e.message, 'error');
      setConfirmDelete(null);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">

      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">📍 Localidades</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {localidades.length} localidad(es) encontrada(s)
          </p>
        </div>
        <button
          onClick={() => { setEditando(null); setModalForm(true); }}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-sm"
        >
          + Nueva Localidad
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <input
          type="text"
          placeholder="Filtrar por nombre..."
          value={filtros.nombre}
          onChange={(e) => setFiltros((f) => ({ ...f, nombre: e.target.value }))}
          className="input-base"
        />
        <input
          type="text"
          placeholder="Filtrar por provincia..."
          value={filtros.provincia}
          onChange={(e) => setFiltros((f) => ({ ...f, provincia: e.target.value }))}
          className="input-base"
        />
      </div>

      {/* Tabla / Lista */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">Cargando...</div>
      ) : localidades.length === 0 ? (
        <div className="text-center py-16 text-slate-400">No se encontraron localidades.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Provincia</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {localidades.map((loc) => (
                <tr key={loc.id} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3 text-slate-400 font-mono">#{loc.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">{loc.nombre}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{loc.provincia}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setEditando(loc); setModalForm(true); }}
                        className="px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setConfirmDelete(loc.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal formulario */}
      {modalForm && (
        <Modal
          title={editando ? 'Editar Localidad' : 'Nueva Localidad'}
          onClose={() => { setModalForm(false); setEditando(null); }}
        >
          <LocalidadForm
            inicial={editando}
            onGuardar={handleGuardar}
            onCancelar={() => { setModalForm(false); setEditando(null); }}
          />
        </Modal>
      )}

      {/* Diálogo de confirmación */}
      {confirmDelete && (
        <ConfirmDialog
          message="¿Estás seguro que querés eliminar esta localidad? Si tiene contactos asociados, la acción será rechazada."
          onConfirm={handleEliminar}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

    </main>
  );
}

// ─── Formulario de Localidad ──────────────────────────────────────────────────
function LocalidadForm({ inicial, onGuardar, onCancelar }) {
  const [form, setForm] = useState({
    nombre: inicial?.nombre || '',
    provincia: inicial?.provincia || '',
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errores[name]) setErrores((er) => ({ ...er, [name]: '' }));
  };

  const handleSubmit = () => {
    const errs = validarLocalidad(form);
    if (Object.keys(errs).length > 0) { setErrores(errs); return; }
    onGuardar(form);
  };

  return (
    <div className="flex flex-col gap-4">
      <Campo label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} error={errores.nombre} />
      <Campo label="Provincia" name="provincia" value={form.provincia} onChange={handleChange} error={errores.provincia} />

      <div className="flex gap-3 pt-2">
        <button onClick={onCancelar} className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors">
          Cancelar
        </button>
        <button onClick={handleSubmit} className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
          {inicial ? 'Guardar cambios' : 'Crear localidad'}
        </button>
      </div>
    </div>
  );
}

function Campo({ label, name, value, onChange, error, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none transition-colors
          ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-indigo-500'}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
