<template>
  <div>
    <UHeader>
      <template #logo>
        Nuxt UI Pro <UBadge label="Starter" variant="subtle" class="mb-0.5" />
      </template>

      <template #right>
        <UColorModeButton />

        <UButton to="https://github.com/nuxt-ui-pro/starter" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" color="gray" variant="ghost" />
      </template>
      <template #center>
        <!-- <UDocsSearchButton /> -->
      </template>
      <template #panel>
        <Navigation />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <div class="hidden lg:block pt-4">
              <Navigation />
            </div>
          </template>
          <div class="">
            <UBreadcrumb :links="breadcrumbLinks" class="my-4" />
            <NuxtPage />
          </div>
        </UPage>
      </UContainer>
    </UMain>

    <UFooter>
      <template #left>
        Copyright © {{ new Date().getFullYear() }}
      </template>
    </UFooter>
  </div>
</template>

<script setup>
useHead({
  title: 'Nuxt UI Pro - Starter',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  description: 'Nuxt UI Pro is a collection of premium components built on top of Nuxt UI to create beautiful & responsive Nuxt applications in minutes.'
})

const breadcrumbLinks = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'Navigation',
  icon: 'i-heroicons-square-3-stack-3d'
}, {
  label: 'Breadcrumb',
  icon: 'i-heroicons-link'
}]
</script>