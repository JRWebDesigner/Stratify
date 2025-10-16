import { useState } from "react";

const FUNCIONALIDADES = [
  { 
    label: "Formulario de contacto", 
    value: "contacto", 
    precio: 60,
    icon: "📧",
    descripcion: "Formulario seguro para que tus clientes se comuniquen contigo"
  },
  { 
    label: "Compras por internet", 
    value: "ecommerce", 
    precio: 200,
    icon: "🛒",
    descripcion: "Tienda online completa con carrito de compras y pasarela de pagos"
  },
  { 
    label: "Galería de imágenes", 
    value: "galeria", 
    precio: 50,
    icon: "🖼️",
    descripcion: "Muestra tus productos o trabajos con galerías modernas y responsive"
  },
  { 
    label: "Blog", 
    value: "blog", 
    precio: 95,
    icon: "📝",
    descripcion: "Sistema de blog integrado para compartir contenido y mejorar SEO"
  },
];

const PRECIO_PAGINA = 100;
const PRECIO_DOMINIO = 15;

export default function Cotizar() {
  const [empresa, setEmpresa] = useState("");
  const [dominio, setDominio] = useState(false);
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [paginas, setPaginas] = useState(["Inicio"]);
  const [nuevaPagina, setNuevaPagina] = useState("");
  const [activeTab, setActiveTab] = useState("configuracion");

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAgregarPagina();
    }
  };

  // WhatsApp
  const numeroWhatsapp = "+59168071168";
  const handleEnviarWhatsapp = () => {
    const funcionalidadesTexto = funcionalidades.map(f => FUNCIONALIDADES.find(x => x.value === f)?.label).join(", ");
    const paginasTexto = paginas.join(", ");
    const mensaje =
      `🚀 *Cotización Web Stratify*\n\n` +
      `🏢 *Empresa:* ${empresa || "No especificada"}\n` +
      `🌐 *Dominio propio:* ${dominio ? "Sí" : "No"}\n` +
      `⚡ *Funcionalidades:* ${funcionalidadesTexto || "Ninguna"}\n` +
      `📄 *Páginas:* ${paginasTexto}\n\n` +
      `💰 *Monto total:* $${montoTotal} Bs.\n\n` +
      `_Cotización generada desde el sitio web_`;
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="cotizador-container">
      <div className="cotizador-header">
        <h2>Cotiza Tu Sitio Web</h2>
        <p>Personaliza tu sitio web ideal y obtén un precio instantáneo</p>
      </div>

      <div className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === "configuracion" ? "active" : ""}`}
          onClick={() => setActiveTab("configuracion")}
        >
          ⚙️ Configuración
        </button>
        <button 
          className={`tab-button ${activeTab === "resumen" ? "active" : ""}`}
          onClick={() => setActiveTab("resumen")}
        >
          📊 Resumen
        </button>
      </div>

      {activeTab === "configuracion" && (
        <div className="configuracion-tab">
          {/* Información de la Empresa */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">🏢</div>
              <h3>Información de la Empresa</h3>
            </div>
            <div className="input-group">
              <label>Nombre de tu empresa o proyecto</label>
              <input 
                type="text" 
                value={empresa} 
                onChange={e => setEmpresa(e.target.value)} 
                placeholder="Ej: Mi Empresa S.A." 
                className="text-input"
              />
            </div>
          </div>

          {/* Dominio */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">🌐</div>
              <h3>Configuración de Dominio</h3>
            </div>
            <div className="toggle-group">
              <label className="toggle-label">
                <span>¿Ya tienes un dominio?</span>
                <div className="toggle-container">
                  <input 
                    type="checkbox" 
                    checked={dominio} 
                    onChange={e => setDominio(e.target.checked)} 
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                </div>
              </label>
              <div className="price-badge">+{PRECIO_DOMINIO} Bs/año</div>
            </div>
            <p className="helper-text">
              {dominio 
                ? "Perfecto! Configuraremos tu dominio existente"
                : "Te ayudamos a conseguir el dominio perfecto para tu negocio"
              }
            </p>
          </div>

          {/* Funcionalidades */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">⚡</div>
              <h3>Funcionalidades Adicionales</h3>
            </div>
            <div className="funcionalidades-grid">
              {FUNCIONALIDADES.map(f => (
                <div 
                  key={f.value} 
                  className={`funcionalidad-card ${funcionalidades.includes(f.value) ? "selected" : ""}`}
                  onClick={() => handleFuncionalidad(f.value)}
                >
                  <div className="funcionalidad-header">
                    <div className="funcionalidad-icon">{f.icon}</div>
                    <div className="funcionalidad-checkbox">
                      <input
                        type="checkbox"
                        checked={funcionalidades.includes(f.value)}
                        onChange={() => {}}
                        className="hidden-checkbox"
                      />
                      <div className="custom-checkbox"></div>
                    </div>
                  </div>
                  <h4>{f.label}</h4>
                  <p>{f.descripcion}</p>
                  <div className="funcionalidad-price">+{f.precio} Bs</div>
                </div>
              ))}
            </div>
          </div>

          {/* Páginas */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">📄</div>
              <h3>Páginas de tu Sitio Web</h3>
            </div>
            
            <div className="paginas-input-group">
              <div className="input-with-button">
                <input
                  type="text"
                  value={nuevaPagina}
                  onChange={e => setNuevaPagina(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ej: Sobre Nosotros, Servicios, Contacto..."
                  className="text-input"
                />
                <button 
                  type="button" 
                  onClick={handleAgregarPagina}
                  className="add-button"
                  disabled={!nuevaPagina.trim()}
                >
                  <span>+ Agregar</span>
                </button>
              </div>
            </div>

            <div className="paginas-list">
              {paginas.map((pagina, index) => (
                <div key={pagina} className="pagina-item">
                  <div className="pagina-info">
                    <span className="pagina-number">{index + 1}</span>
                    <span className="pagina-name">{pagina}</span>
                    {pagina === "Inicio" && <span className="pagina-required">(Requerida)</span>}
                  </div>
                  <div className="pagina-actions">
                    <span className="pagina-price">+{PRECIO_PAGINA} Bs</span>
                    {pagina !== "Inicio" && (
                      <button 
                        type="button" 
                        onClick={() => handleEliminarPagina(pagina)}
                        className="delete-button"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "resumen" && (
        <div className="resumen-tab">
          <div className="resumen-header">
            <h3>Resumen de tu Cotización</h3>
            <p>Revisa los detalles antes de enviar</p>
          </div>

          <div className="resumen-grid">
            <div className="resumen-details">
              <div className="resumen-section">
                <h4>📋 Detalles del Proyecto</h4>
                <div className="detail-item">
                  <span>Empresa:</span>
                  <span>{empresa || "No especificada"}</span>
                </div>
                <div className="detail-item">
                  <span>Dominio:</span>
                  <span>{dominio ? "Incluido" : "No incluido"}</span>
                </div>
              </div>

              <div className="resumen-section">
                <h4>📄 Páginas ({paginas.length})</h4>
                {paginas.map(pagina => (
                  <div key={pagina} className="detail-item">
                    <span>{pagina}</span>
                    <span>+{PRECIO_PAGINA} Bs</span>
                  </div>
                ))}
              </div>

              {funcionalidades.length > 0 && (
                <div className="resumen-section">
                  <h4>⚡ Funcionalidades ({funcionalidades.length})</h4>
                  {funcionalidades.map(func => {
                    const funcData = FUNCIONALIDADES.find(f => f.value === func);
                    return (
                      <div key={func} className="detail-item">
                        <span>{funcData?.label}</span>
                        <span>+{funcData?.precio} Bs</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="resumen-total">
              <div className="total-card">
                <h4>Total del Proyecto</h4>
                <div className="total-amount">{montoTotal} Bs</div>
                <div className="total-breakdown">
                  <div className="breakdown-item">
                    <span>Páginas ({paginas.length})</span>
                    <span>{montoPaginas} Bs</span>
                  </div>
                  {funcionalidades.length > 0 && (
                    <div className="breakdown-item">
                      <span>Funcionalidades</span>
                      <span>{montoFuncionalidades} Bs</span>
                    </div>
                  )}
                  {dominio && (
                    <div className="breakdown-item">
                      <span>Dominio</span>
                      <span>{montoDominio} Bs</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Previsualización de pestañas */}
          <div className="preview-section">
            <h4>🌐 Previsualización de Navegación</h4>
            <div className="tabs-preview">
              {paginas.map(pagina => (
                <div key={pagina} className="tab-preview-item">
                  {pagina}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Botón de acción */}
      <div className="action-section">
        <button
          type="button"
          onClick={handleEnviarWhatsapp}
          className="whatsapp-button"
          disabled={paginas.length === 0}
        >
          <span className="whatsapp-icon">💬</span>
          <span className="button-text">
            {paginas.length === 0 ? "Agrega al menos una página" : `Cotizar por WhatsApp - ${montoTotal} Bs`}
          </span>
        </button>
        
        <div className="action-notes">
          <p>✅ Precio final incluye diseño, desarrollo y hosting por 1 año</p>
          <p>✅ Soporte técnico incluido por 30 días</p>
        </div>
      </div>

      <style jsx>{`
        .cotizador-container {
          max-width: 800px;
          margin: 2rem auto;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid #334155;
        }

        .cotizador-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .cotizador-header h2 {
          color: #f8fafc;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cotizador-header p {
          color: #94a3b8;
          font-size: 1.1rem;
        }

        .tabs-navigation {
          display: flex;
          background: #1e293b;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 2rem;
        }

        .tab-button {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: transparent;
          color: #94a3b8;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tab-button.active {
          background: #3b82f6;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .form-section {
          background: rgba(30, 41, 59, 0.6);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border: 1px solid #334155;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
        }

        .section-icon {
          font-size: 1.5rem;
        }

        .section-header h3 {
          color: #f8fafc;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .input-group {
          margin-bottom: 1rem;
        }

        .input-group label {
          display: block;
          color: #f1f5f9;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .text-input {
          width: 100%;
          padding: 12px 16px;
          background: #0f172a;
          border: 2px solid #334155;
          border-radius: 10px;
          color: #f8fafc;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .text-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .toggle-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .toggle-label {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #f1f5f9;
          font-weight: 500;
          cursor: pointer;
        }

        .toggle-container {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .toggle-input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #475569;
          border-radius: 24px;
          transition: .4s;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          border-radius: 50%;
          transition: .4s;
        }

        .toggle-input:checked + .toggle-slider {
          background-color: #3b82f6;
        }

        .toggle-input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }

        .price-badge {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .helper-text {
          color: #94a3b8;
          font-size: 0.875rem;
          margin-top: 8px;
        }

        .funcionalidades-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .funcionalidad-card {
          background: #1e293b;
          border: 2px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .funcionalidad-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
        }

        .funcionalidad-card.selected {
          border-color: #3b82f6;
          background: linear-gradient(135deg, #1e293b, #1e40af20);
        }

        .funcionalidad-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .funcionalidad-icon {
          font-size: 2rem;
        }

        .funcionalidad-checkbox {
          position: relative;
        }

        .hidden-checkbox {
          display: none;
        }

        .custom-checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid #475569;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .funcionalidad-card.selected .custom-checkbox {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .funcionalidad-card.selected .custom-checkbox:after {
          content: "✓";
          color: white;
          font-weight: bold;
        }

        .funcionalidad-card h4 {
          color: #f8fafc;
          margin-bottom: 8px;
          font-size: 1.1rem;
        }

        .funcionalidad-card p {
          color: #94a3b8;
          font-size: 0.875rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .funcionalidad-price {
          color: #10b981;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .paginas-input-group {
          margin-bottom: 1rem;
        }

        .input-with-button {
          display: flex;
          gap: 12px;
        }

        .add-button {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 12px 20px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .add-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .add-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .paginas-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pagina-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #0f172a;
          border-radius: 10px;
          border: 1px solid #334155;
        }

        .pagina-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pagina-number {
          background: #3b82f6;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .pagina-name {
          color: #f8fafc;
          font-weight: 500;
        }

        .pagina-required {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .pagina-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pagina-price {
          color: #10b981;
          font-weight: 600;
        }

        .delete-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .delete-button:hover {
          opacity: 1;
        }

        .resumen-tab {
          animation: fadeIn 0.5s ease;
        }

        .resumen-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .resumen-header h3 {
          color: #f8fafc;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .resumen-header p {
          color: #94a3b8;
        }

        .resumen-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .resumen-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .resumen-section {
          background: #1e293b;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #334155;
        }

        .resumen-section h4 {
          color: #f8fafc;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #334155;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-item span:first-child {
          color: #cbd5e1;
        }

        .detail-item span:last-child {
          color: #10b981;
          font-weight: 600;
        }

        .resumen-total {
          display: flex;
          align-items: flex-start;
        }

        .total-card {
          background: linear-gradient(135deg, #1e40af, #3730a3);
          border-radius: 16px;
          padding: 2rem;
          width: 100%;
          text-align: center;
        }

        .total-card h4 {
          color: #f8fafc;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .total-amount {
          color: #f8fafc;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .total-breakdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          color: #cbd5e1;
          font-size: 0.9rem;
        }

        .preview-section {
          background: #1e293b;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #334155;
        }

        .preview-section h4 {
          color: #f8fafc;
          margin-bottom: 1rem;
        }

        .tabs-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tab-preview-item {
          background: #3b82f6;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .action-section {
          margin-top: 2rem;
          text-align: center;
        }

        .whatsapp-button {
          background: linear-gradient(135deg, #25d366, #128c7e);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
          width: 100%;
          justify-content: center;
        }

        .whatsapp-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
        }

        .whatsapp-button:disabled {
          background: #475569;
          cursor: not-allowed;
          transform: none;
        }

        .whatsapp-icon {
          font-size: 1.2rem;
        }

        .action-notes {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .action-notes p {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .cotizador-container {
            margin: 1rem;
            padding: 1.5rem;
          }

          .resumen-grid {
            grid-template-columns: 1fr;
          }

          .funcionalidades-grid {
            grid-template-columns: 1fr;
          }

          .input-with-button {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
