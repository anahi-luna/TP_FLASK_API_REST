import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../context/ToastContext';
import {
  getContactos, createContacto, updateContacto, deleteContacto, getLocalidades,
} from '../services/api';

// ─── Validaciones con Regex (cliente) ─────────────────────────────────────────
const REGEX_EMAIL    = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const REGEX_TELEFONO = /^\+?[\d\s\(\)\-]{7,20}$/;
const REGEX_TEXTO    = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\.\,\-]+$/;
const REGEX_DIR      = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s\.\,\-\#]+$/;

function validarContacto(form) {
  const e = {};
  if (!form.nombre.trim())                     e.nombre     = 'El nombre es obligatorio.';
  else if (!REGEX_TEXTO.test(form.nombre))     e.nombre     = 'Solo letras y espacios.';
  if (!form.apellido.trim())                   e.apellido   = 'El apellido es obligatorio.';
  else if (!REGEX_TEXTO.test(form.apellido))   e.apellido   = 'Solo letras y espacios.';
  if (!form.direccion.trim())                  e.direccion  = 'La dirección es obligatoria.';
  else if (!REGEX_DIR.test(form.direccion))    e.direccion  = 'Formato de dirección inválido.';
  if (!form.email.trim())                      e.email      = 'El email es obligatorio.';
  else if (!REGEX_EMAIL.test(form.email))      e.email      = 'Email inválido.';
  if (!form.telefono.trim())                   e.telefono   = 'El teléfono es obligatorio.';
  else if (!REGEX_TELEFONO.test(form.telefono))e.telefono   = 'Teléfono inválido (7-20 dígitos).';
  if (!form.id_localidad)                      e.id_localidad = 'Seleccioná una localidad.';
  return e;
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function Contactos() {
  const { addToast } = useToast();
  const [contactos, setContactos]     = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [filtros, setFiltros]         = useState({ nombre: '', apellido: '', id_localidad: '' });

  const [modalForm, setModalForm]     = useState(false);
  const [editando, setEditando]       = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Carga inicial de localidades para el select
  useEffect(() => {
    getLocalidades('')
      .then((r) => setLocalidades(r.data))
      .catch(() => {});
  }, []);

  const cargar = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filtros.nombre)       params.append('nombre', filtros.nombre);
      if (filtros.apellido)     params.append('apellido', filtros.apellido);
      if (filtros.id_localidad) params.append('id_localidad', filtros.id_localidad);
      const res = await getContactos(`?${params}`);
      setContactos(res.data);
    } catch (e) {
      addToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, [filtros]);

  const handleGuardar = async (formData) => {
    try {
      if (editando) {
        await updateContacto(editando.id, formData);
        addToast('Contacto actualizado correctamente.');
      } else {
        await createContacto(formData);
        addToast('Contacto creado exitosamente.');
      }
      setModalForm(false);
      setEditando(null);
      cargar();
    } catch (e) {
      addToast(e.message, 'error');
    }
  };

  const handleEliminar = async () => {
    try {
      await deleteContacto(confirmDelete);
      addToast('Contacto eliminado correctamente.');
      setConfirmDelete(null);
      cargar();
    } catch (e) {
      addToast(e.message, 'error');
      setConfirmDelete(null);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">

      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">👥 Contactos</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {contactos.length} contacto(s) encontrado(s)
          </p>
        </div>
        <button
          onClick={() => { setEditando(null); setModalForm(true); }}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-sm"
        >
          + Nuevo Contacto
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <input
          type="text" placeholder="Filtrar por nombre..."
          value={filtros.nombre}
          onChange={(e) => setFiltros((f) => ({ ...f, nombre: e.target.value }))}
          className="input-base"
        />
        <input
          type="text" placeholder="Filtrar por apellido..."
          value={filtros.apellido}
          onChange={(e) => setFiltros((f) => ({ ...f, apellido: e.target.value }))}
          className="input-base"
        />
        <select
          value={filtros.id_localidad}
          onChange={(e) => setFiltros((f) => ({ ...f, id_localidad: e.target.value }))}
          className="input-base"
        >
          <option value="">Todas las localidades</option>
          {localidades.map((l) => (
            <option key={l.id} value={l.id}>{l.nombre} — {l.provincia}</option>
          ))}
        </select>
      </div>

      {/* Tabla responsiva */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">Cargando...</div>
      ) : contactos.length === 0 ? (
        <div className="text-center py-16 text-slate-400">No se encontraron contactos.</div>
      ) : (
        <>
          {/* Vista desktop: tabla */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Teléfono</th>
                  <th className="px-4 py-3 text-left">Localidad</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {contactos.map((c) => (
                  <tr key={c.id} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3 text-slate-400 font-mono">#{c.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">
                      {c.nombre} {c.apellido}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{c.email}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{c.telefono}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                        {c.localidad?.nombre}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => { setEditando(c); setModalForm(true); }}
                          className="px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium hover:bg-amber-200 transition-colors"
                        >Editar</button>
                        <button
                          onClick={() => setConfirmDelete(c.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-200 transition-colors"
                        >Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista móvil: cards */}
          <div className="md:hidden flex flex-col gap-3">
            {contactos.map((c) => (
              <div key={c.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{c.nombre} {c.apellido}</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">{c.localidad?.nombre}, {c.localidad?.provincia}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">#{c.id}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{c.email}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{c.telefono}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{c.direccion}</p>
                <div className="flex gap-2">
                  <button onClick={() => { setEditando(c); setModalForm(true); }}
                    className="flex-1 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium">
                    Editar
                  </button>
                  <button onClick={() => setConfirmDelete(c.id)}
                    className="flex-1 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal formulario */}
      {modalForm && (
        <Modal
          title={editando ? 'Editar Contacto' : 'Nuevo Contacto'}
          onClose={() => { setModalForm(false); setEditando(null); }}
        >
          <ContactoForm
            inicial={editando}
            localidades={localidades}
            onGuardar={handleGuardar}
            onCancelar={() => { setModalForm(false); setEditando(null); }}
          />
        </Modal>
      )}

      {confirmDelete && (
        <ConfirmDialog
          message="¿Seguro que querés eliminar este contacto? Esta acción no se puede deshacer."
          onConfirm={handleEliminar}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

    </main>
  );
}

// ─── Formulario de Contacto ───────────────────────────────────────────────────
function ContactoForm({ inicial, localidades, onGuardar, onCancelar }) {
  const [form, setForm] = useState({
    nombre:      inicial?.nombre      || '',
    apellido:    inicial?.apellido    || '',
    direccion:   inicial?.direccion   || '',
    email:       inicial?.email       || '',
    telefono:    inicial?.telefono    || '',
    id_localidad: inicial?.id_localidad || '',
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errores[name]) setErrores((er) => ({ ...er, [name]: '' }));
  };

  const handleSubmit = () => {
    const errs = validarContacto(form);
    if (Object.keys(errs).length > 0) { setErrores(errs); return; }
    onGuardar({ ...form, id_localidad: parseInt(form.id_localidad) });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Campo label="Nombre"   name="nombre"   value={form.nombre}   onChange={handleChange} error={errores.nombre} />
        <Campo label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} error={errores.apellido} />
      </div>
      <Campo label="Dirección"  name="direccion" value={form.direccion} onChange={handleChange} error={errores.direccion} />
      <Campo label="Email"      name="email"     value={form.email}     onChange={handleChange} error={errores.email} type="email" />
      <Campo label="Teléfono"   name="telefono"  value={form.telefono}  onChange={handleChange} error={errores.telefono} />

      {/* Select de localidad */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Localidad</label>
        <select
          name="id_localidad"
          value={form.id_localidad}
          onChange={handleChange}
          className={`w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none transition-colors
            ${errores.id_localidad ? 'border-red-400' : 'border-slate-300 dark:border-slate-600 focus:border-indigo-500'}`}
        >
          <option value="">— Seleccioná una localidad —</option>
          {localidades.map((l) => (
            <option key={l.id} value={l.id}>{l.nombre} — {l.provincia}</option>
          ))}
        </select>
        {errores.id_localidad && <p className="text-xs text-red-500 mt-1">{errores.id_localidad}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onCancelar}
          className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors">
          Cancelar
        </button>
        <button onClick={handleSubmit}
          className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
          {inicial ? 'Guardar cambios' : 'Crear contacto'}
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
        type={type} name={name} value={value} onChange={onChange}
        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none transition-colors
          ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-indigo-500'}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
