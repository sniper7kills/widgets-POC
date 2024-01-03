<template>
  <UDivider :label="label" />
</template>
  
<script setup lang="ts">  
defineProps({
    label:
    {
        type: String || null,
        default: null
    }
})
</script>