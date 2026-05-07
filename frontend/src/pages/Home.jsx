import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStats } from '../services/api';

/**
 * Página de inicio.
 * Muestra un resumen estadístico: total de contactos y localidades.
 */
export default function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data[0]))
      .catch(() => setStats({ total_contactos: '—', total_localidades: '—' }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Hero */}
      <div className="text-center mb-12">
        <span className="text-6xl">📒</span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Libreta de Contactos
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
          Gestión completa de contactos y localidades con validaciones avanzadas.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <StatCard
          icon="👥"
          label="Total de Contactos"
          value={loading ? '...' : stats?.total_contactos}
          color="indigo"
          to="/contactos"
        />
        <StatCard
          icon="📍"
          label="Total de Localidades"
          value={loading ? '...' : stats?.total_localidades}
          color="emerald"
          to="/localidades"
        />
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickLink to="/contactos" emoji="👥" title="Gestionar Contactos"
          desc="Crear, editar, buscar y eliminar contactos." />
        <QuickLink to="/localidades" emoji="📍" title="Gestionar Localidades"
          desc="Administrar las localidades del sistema." />
      </div>

    </main>
  );
}

// ─── Componentes internos ─────────────────────────────────────────────────────

function StatCard({ icon, label, value, color, to }) {
  const colors = {
    indigo: 'from-indigo-500 to-indigo-600',
    emerald: 'from-emerald-500 to-emerald-600',
  };

  return (
    <Link to={to} className="group block">
      <div className={`
        bg-gradient-to-br ${colors[color]} rounded-2xl p-6 text-white
        shadow-lg hover:shadow-xl transition-all duration-300
        group-hover:scale-[1.02]
      `}>
        <div className="text-4xl mb-3">{icon}</div>
        <div className="text-4xl font-bold mb-1">{value}</div>
        <div className="text-white/80 text-sm font-medium">{label}</div>
      </div>
    </Link>
  );
}

function QuickLink({ to, emoji, title, desc }) {
  return (
    <Link
      to={to}
      className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600
        hover:shadow-md transition-all duration-200 group"
    >
      <span className="text-3xl">{emoji}</span>
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
      </div>
    </Link>
  );
}
