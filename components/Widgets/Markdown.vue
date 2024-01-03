<template>
  <WidgetsInterface>
    <div class="prose dark:prose-invert">
      <ContentRenderer :value="data" :data="$attrs">
        <ContentRendererMarkdown :value="data" :data="$attrs" />
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
    </div>
  </WidgetsInterface>
</template>

<script setup lang="ts">
import markdownParser from '@nuxt/content/transformers/markdown'

const contentMarkdown = `
# Hello World.
`

const props = defineProps({
    content: {
        type: String,
        required: true,
        default: 'No Content Prop Detected.'
    }
})

const data = await markdownParser.parse('md', props.content == null ? 'No Content Prop Detected' : props.content, {})
</script>