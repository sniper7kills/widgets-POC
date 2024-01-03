// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    devServer: {
        url: 'http://192.168.1.197:3000'
    }
  },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxtjs/apollo',
    '@nuxt/content',
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  buildModules: ['~/modules/ngrok'],
  components: {
    global: true,
    dirs: ['~/components']
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  // Devtools / Typescript
  devtools: { enabled: true },
  typescript: { strict: true },
  auth: {
    isEnabled: false,
    provider: {
      type: 'graphql',
    },
    globalAppMiddleware: true
    // strategies: {
    //   graphql: {
    //     scheme: '~/schemes/graphqlScheme.js',
    //   },
    // },
    // redirect: {
    //   login: '/login',
    //   logout: '/login?logout=true',
    //   callback: false,
    //   home: '/dashboard',
    // },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.spacex.land/graphql'
      }
    },
  },
  content: {
    watch: {
        ws: {
            hostname: '192.168.1.197'
        }
    }
}
})
