
# 🧠 TestorNinja

**TestorNinja** es una aplicación web que genera pruebas dinámicas de opción múltiple usando inteligencia artificial.  
El usuario ingresa un tema y un nivel, y la IA genera automáticamente un test de 10 preguntas. Al finalizar, el sistema califica las respuestas y genera un feedback personalizado con recomendaciones de estudio.

---

## ✨ Características

✅ Generación automática de preguntas usando **Together AI**  
✅ Interfaz construida con **Nuxt 3** + **TailwindCSS**  
✅ Estado global con **Pinia** y persistencia de datos  
✅ Feedback inteligente para que el usuario sepa qué estudiar  
✅ UI responsive y moderna  
✅ 100% desarrollado con buenas prácticas (Composition API, `script setup`, etc.)

---

## 🚀 Tecnologías

- [Nuxt 3](https://nuxt.com/) – Framework Vue para SSR y SPA
- [Pinia](https://pinia.vuejs.org/) – Gestión de estado
- [Tailwind CSS](https://tailwindcss.com/) – Estilos utilitarios
- [Together AI](https://docs.together.ai/docs/introduction) – API para generación de preguntas y feedback
- [Axios](https://axios-http.com/) – Cliente HTTP
- [Lucide Icons](https://lucide.dev/) – Íconos


## 🔑 Variables de entorno

Debes crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
TOGETHER_API_KEY=tu_clave_privada
```

## 🖥️ Uso

1. Escribe un tema y selecciona el nivel.
2. Haz clic en **Generar prueba**.
3. Responde las 10 preguntas generadas.
4. Al finalizar, obtendrás:

   * Tu puntaje.
   * Un listado con tus respuestas y las correctas.
   * Un mensaje de feedback generado por IA para mejorar tus conocimientos.

---

## 📱 Responsive

El diseño es responsive y está pensado para usarse tanto en escritorio como en dispositivos móviles.

---

### ✨ Créditos

Desarrollado por [Brayan David Mosquera Medina](https://www.linkedin.com/in/brayan-david-mosquera-medina-143970253/)

---

**💡 TestorNinja: ¡Pon a prueba tu mente, mejora cada día!**

```


## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```
