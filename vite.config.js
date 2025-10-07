import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
    {
      name: 'handle-post-requests',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST') {
            console.log(`Handling POST request: ${req.url}`)

            // Для API-запросов
            if (req.url.startsWith('/api/')) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({
                message: 'POST handled as GET',
                originalUrl: req.url
              }))
              return
            }

            // Для SPA маршрутов - сохраняем оригинальный URL с параметрами
            const originalUrl = req.url
            req.method = 'GET'

            // Важно: создаем новое свойство, чтобы не потерять оригинальный URL
            req.originalUrl = originalUrl

            // Передаем управление дальше с оригинальным URL
            req.url = originalUrl
          }
          next()
        })
      }
    }
  ],
  base: '/bitrix-deals-vue/',
})
