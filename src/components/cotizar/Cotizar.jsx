import { useState } from "react";

const FUNCIONALIDADES = [
  { label: "Formulario de contacto", value: "contacto", precio: 60 },
  { label: "Compras por internet", value: "ecommerce", precio: 200 },
  { label: "Galería de imágenes", value: "galeria", precio: 50 },
  { label: "Blog", value: "blog", precio: 95 },
];

const PRECIO_PAGINA = 100;
const PRECIO_DOMINIO = 15;

export default function Cotizar() {
  const [empresa, setEmpresa] = useState("");
  const [dominio, setDominio] = useState(false);
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [paginas, setPaginas] = useState(["Inicio"]);
  const [nuevaPagina, setNuevaPagina] = useState("");

  // Calcular monto total
  const montoPaginas = paginas.length * PRECIO_PAGINA;
  const montoFuncionalidades = funcionalidades.reduce(
    (acc, val) => acc + (FUNCIONALIDADES.find(f => f.value === val)?.precio || 0),
    0
  );
  const montoDominio = dominio ? PRECIO_DOMINIO : 0;
  const montoTotal = montoPaginas + montoFuncionalidades + montoDominio;

  // Handlers
  const handleFuncionalidad = (value) => {
    setFuncionalidades(prev =>
      prev.includes(value)
        ? prev.filter(f => f !== value)
        : [...prev, value]
    );
  };

  const handleAgregarPagina = () => {
    if (nuevaPagina.trim() && !paginas.includes(nuevaPagina.trim())) {
      setPaginas([...paginas, nuevaPagina.trim()]);
      setNuevaPagina("");
    }
  };

  const handleEliminarPagina = (nombre) => {
    if (nombre !== "Inicio") {
      setPaginas(paginas.filter(p => p !== nombre));
    }
  };

  // WhatsApp
  const numeroWhatsapp = "+59168071168";
  const handleEnviarWhatsapp = () => {
    const funcionalidadesTexto = funcionalidades.map(f => FUNCIONALIDADES.find(x => x.value === f)?.label).join(", ");
    const paginasTexto = paginas.join(", ");
    const mensaje =
      `Cotización Web\n` +
      `Empresa: ${empresa}\n` +
      `Dominio propio: ${dominio ? "Sí" : "No"}\n` +
      `Funcionalidades: ${funcionalidadesTexto || "Ninguna"}\n` +
      `Páginas: ${paginasTexto}\n` +
      `Monto total: $${montoTotal}`;
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ maxWidth: 600, margin: "32px auto", padding: 32, background: "#0a2342", borderRadius: 16, boxShadow: "0 2px 16px #0006", border: "2px solid #fff" }}>
      <h2 style={{ color: "#fff", marginBottom: 24, textAlign: "center", letterSpacing: 1 }}>Formulario de Cotización Web</h2>
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: "#fff" }}>Nombre de empresa:</label><br />
        <input type="text" value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Ej: Mi Empresa" style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #fff", background: "#021024", color: "#fff" }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: "#fff" }}>¿Cuenta con dominio propio?</label><br />
        <input type="checkbox" checked={dominio} onChange={e => setDominio(e.target.checked)} /> <span style={{ color: "#fff" }}>No</span>
        <span style={{ marginLeft: 8, color: "#4f8cff" }}>(+{PRECIO_DOMINIO} Bs)</span>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: "#fff" }}>Funcionalidades:</label><br />
        {FUNCIONALIDADES.map(f => (
          <div key={f.value}>
            <input
              type="checkbox"
              checked={funcionalidades.includes(f.value)}
              onChange={() => handleFuncionalidad(f.value)}
            /> <span style={{ color: "#fff" }}>{f.label}</span> <span style={{ color: "#4f8cff" }}>(+{f.precio} Bs)</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: "#fff" }}>Páginas de la web:</label>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <input
            type="text"
            value={nuevaPagina}
            onChange={e => setNuevaPagina(e.target.value)}
            placeholder="Ej: Sobre Nosotros"
            style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #fff", background: "#021024", color: "#fff" }}
          />
          <button type="button" onClick={handleAgregarPagina} style={{ background: "#4f8cff", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer" }}>Agregar</button>
        </div>
        <ul style={{ marginTop: 8 }}>
          {paginas.map(p => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
              <span>{p}</span>
              {p !== "Inicio" && (
                <button type="button" onClick={() => handleEliminarPagina(p)} style={{ color: "#ff4f4f", border: "none", background: "none", cursor: "pointer" }}>Eliminar</button>
              )}
              <span style={{ color: "#4f8cff", marginLeft: "auto" }}>+{PRECIO_PAGINA} Bs</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: 24 }}>
        <strong style={{ color: "#fff", fontSize: 18 }}>Monto total: {montoTotal} Bs.</strong>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: "#fff" }}>Previsualización de pestañas:</label>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {paginas.map(p => (
            <div key={p} style={{ padding: "6px 16px", background: "#021024", borderRadius: 6, border: "1px solid #4f8cff", color: "#4f8cff", fontWeight: "bold" }}>{p}</div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={handleEnviarWhatsapp}
        style={{ width: "100%", background: "#25d366", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 18, fontWeight: "bold", cursor: "pointer", marginTop: 16 }}
      >
        Terminar
      </button>
    </div>
  );
}