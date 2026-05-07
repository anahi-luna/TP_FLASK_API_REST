# Informe Individual — Integrante Frontend

**Nombre**: Libertini Gustavo Damián 
**Rol**: Frontend (React & Tailwind CSS)

---

## 1. Desafío Técnico: ¿Qué fue lo que más te costó?

El mayor desafío fue implementar el **sistema de Contextos de React** para el tema (dark/light) y los Toasts de forma global, sin que los componentes hijos tuvieran que recibir props desde arriba.

Al principio intenté pasar el estado de `darkMode` como prop desde `App.jsx` hacia `Navbar`, luego hacia cada página, y desde cada página hacia los modales. Rápidamente el código se volvió inmanejable (lo que se llama "prop drilling"). 

La solución fue crear un `ThemeContext` y un `ToastContext` con `createContext` y `useContext` de React. Esto permite que cualquier componente en el árbol, sin importar cuán profundo esté, pueda acceder al tema o disparar un toast con un simple `const { addToast } = useToast()`.

El otro desafío fue el **modo oscuro con Tailwind**. Configurar `darkMode: 'class'` en Tailwind requiere que la clase `dark` esté presente en el elemento `<html>`. Tuve que aprender que esto se maneja con `document.documentElement.classList.toggle('dark', darkMode)` desde el `useEffect` del contexto, no desde el CSS directamente.

---

## 2. Aprendizaje: Herramienta o concepto nuevo que ahora domino

**React Router v6** era completamente nuevo para mí.

Antes de este trabajo práctico nunca había construido una SPA (Single Page Application) real. Todo lo que conocía era el `href` de HTML y la recarga completa de página. Con React Router v6 entendí el concepto de **enrutamiento del lado del cliente**: la URL cambia, el navegador no recarga, y React simplemente desmonta un componente y monta otro.

Aprendí a usar:
- `<BrowserRouter>` para habilitar el enrutamiento.
- `<Routes>` y `<Route path="..." element={...}>` para definir las vistas.
- `<Link>` en reemplazo del `<a>` de HTML para navegar sin recargar.
- El hook `useLocation()` para saber en qué ruta estoy actualmente (lo usé para resaltar el link activo en la Navbar).

Este concepto es fundamental para cualquier desarrollo frontend moderno. Hoy entiendo por qué frameworks como Next.js existen: son React Router (entre otras cosas) pero con renderizado del lado del servidor.
