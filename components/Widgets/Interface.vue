<template>
  <UContainer :ui="ui">
    <slot />
  </UContainer>
</template>
<script setup lang="ts">
import { useSlots } from 'vue'
const slots = useSlots()

const ui = {
    base: 'flex-grow flex',
    body: {
        base: 'flex-grow items-stretch',
    }
}
</script>
