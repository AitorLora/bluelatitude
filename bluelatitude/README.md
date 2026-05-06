# 🌊 BlueLatitude App

Gestión de motos de agua · Puerto del Molinar · Palma 2026

## Estructura del proyecto

```
bluelatitude/
├── index.html          ← punto de entrada
├── css/
│   └── styles.css      ← todos los estilos
├── js/
│   ├── config.js       ← ⚙️  TUS DATOS (motos, precios, WhatsApp)
│   ├── data.js         ← estado y funciones de reservas
│   ├── dashboard.js    ← gráficos y KPIs
│   ├── reservas.js     ← lista y formulario de reservas
│   ├── presupuesto.js  ← calculadora y WhatsApp
│   └── app.js          ← navegación y arranque
└── README.md
```

## Cómo arrancar en local

1. Abre la carpeta `bluelatitude` en VS Code
2. Instala la extensión **Live Server**
3. Click derecho en `index.html` → **Open with Live Server**
4. La app abre en `http://127.0.0.1:5500`

## Configuración

Edita **js/config.js** para cambiar:
- Nombre del negocio
- Lista de motos
- Precios por franja horaria
- Número de WhatsApp
- Fianza por unidad

## Próximos pasos

- [ ] Conectar Supabase como base de datos real
- [ ] Subir a GitHub
- [ ] Publicar en Vercel con URL pública
