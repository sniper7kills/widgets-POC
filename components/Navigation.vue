<template>
  <div>
    <UNavigationTree :links="links" default-open />
  </div>
</template>
<script setup>
const links = [{
  label: 'Features',
  to: '#features',
  exactHash: true
}, {
  label: 'Documentation',
  to: 'https://ui.nuxt.com/pro',
  target: '_blank'
}]
</script>