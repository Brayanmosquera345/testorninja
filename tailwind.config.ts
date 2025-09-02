import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B0C08',
        secondary: '#DDEBFF',
        accent: '#FEEDD7',
        background: '#F3F3F3',
        paragraph: '#6A6A6A',
        title: '#0B0C08',
      },
    },
  },
  plugins: [],
}

export default config
