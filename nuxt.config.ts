// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  devtools: { enabled: true },
  modules: ["@bg-dev/nuxt-naiveui","@vite-pwa/nuxt"],
  css: ['~/assets/css/main.css'],
  pwa: {
    manifest: {
      name: "Scribe",
      short_name: "Scribe",
      description: "",
      theme_color: "#18a058",
      lang: 'pl',
      orientation: 'landscape-primary',
      display: 'standalone',
      start_url: '/',
      icons: [
          {"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},
          {"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}
      ]

    }
  },
  devServer: {
    host: '0'
  }
})