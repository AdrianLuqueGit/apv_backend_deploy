# ⚙️ APV - API Backend (Node/Express)

Esta es la API REST que gestiona la lógica de negocio, la base de datos y la seguridad del Administrador de Pacientes de Veterinaria.

### 🚀 [Servidor en Vivo (Render)](https://apv-backend-deploy-nqi9.onrender.com)
> **Nota:** El servidor puede tardar unos segundos en "despertar" si está en modo gratuito.

## 🛠️ Tecnologías
- **Runtime:** Node.js
- **Framework:** Express
- **BD:** MongoDB & Mongoose
- **Seguridad:** JWT (JSON Web Tokens) & Bcrypt
- **Email:** Nodemailer (SMTP)

## 🔑 Características Técnicas
- **Autenticación:** Sistema de registro, confirmación por email y recuperación de password.
- **Seguridad:** Middleware para protección de rutas privadas.
- **CORS:** Configurado para permitir peticiones desde el Frontend de Netlify.

## 💻 Instalación
1. `npm install`
2. Configurar variables de entorno en `.env` (MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS).
3. `npm run dev`

---
*Frontend Repositorio:* https://github.com/AdrianLuqueGit/apv_frontend_deploy
