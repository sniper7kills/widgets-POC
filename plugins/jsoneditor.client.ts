import vue3TsJsoneditor from 'vue3-ts-jsoneditor'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vue3TsJsoneditor)
})
