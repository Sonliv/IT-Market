// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3050,
//     proxy: {
//       "/api": {
//         target: "http://localhost:3000",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, "/api"),
//       },
//     },
//   },
// }
// )


// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Use the same port as your Express server
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Change to match your Express server port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"), // Remove the unnecessary api prefix
      },
    },
  },
})
