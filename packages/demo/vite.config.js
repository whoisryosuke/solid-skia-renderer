import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"

export default defineConfig({
  plugins: [
    solidPlugin({
      solid: {
        generate: "universal",

        renderers: [
          {
            name: "universal",
            moduleName: "solid-canvaskit-renderer",
            elements: []
          }
        ]
      }
    })
  ]
})
