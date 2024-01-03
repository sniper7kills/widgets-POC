<template>
  <div>
    <div class="flex justify-end space-x-4 pb-2">
      <USelect 
        v-model="layoutChoice" 
        :options="layoutChoices" 
        class="w-48"
      />
      <button 
        class="r-0 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="toggleEdit"
      >
        <span v-if="!editable">Edit Layout</span>
        <span v-else>Save Layout</span>
      </button>
    </div>
    

    <UCard 
      v-if="editable"
    >
      <div class="flex space-x-2">
        <USelect v-model="selectedWidget" :options="widgetChoices" class="w-48" />
        <button 
          class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="addWidget(selectedWidget)"
        >
          Add Widget
        </button>
      </div>
    </UCard>


    

    <ClientOnly>
      <grid-layout
        v-model:layout="layout.widgets"
        :auto-size="true"
        :row-height="!editable ? gridConfig.rowHeight : gridConfig.rowHeight + 16"
        :col-num="gridConfig.colNum"
        :is-draggable="editable"
        :is-resizable="editable"
        :is-mirrored="gridConfig.isMirrored"
        :vertical-compact="gridConfig.verticalCompact"
        :margin="gridConfig.margin"
        :use-css-transforms="gridConfig.useCssTransforms"
      >
        <template v-for="item in layout.widgets" :key="item.i">
          <grid-item
            class="flex"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
          >
            <div 
              class="flex flex-grow flex-col overflow-hidden"
            >
              <div v-if="editable" class="">
                <div class="flex justify-end items-center">
                  <div class="flex items-center space-x-4">
                    <UButton color="white" label="Edit" @click="openWidgetModal(item)" />
                    <UModal v-model="item.isOpen">
                      <div class="p-4 overflow-visible z-50">
                        <json-editor
                          v-model="item.props"
                          height="400"
                          mode="tree"
                        />
                      </div>
                    </UModal>
                    <div class="block rounded-full">
                      <UButton color="white" label="Open" @click="removeWidget(item.i)">
                        <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                class="flex flex-grow"
                :class="editable? 'hover:bg-slate-100 dark:hover:bg-slate-800' : ''"
              >
                <component :is="item.name" v-bind="{ ...item.props, ...{code:'word'}}" :key="item.props" />
              </div>
            </div>
          </grid-item>
        </template>
      </grid-layout>
      <UTabs :items="layout.tabs" class="w-full">
        <template #item="{ item }">
          <pre>{{ item }}</pre>
        </template>
      </UTabs>
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
/** 
 * Define some default variables
 */
const editable = ref(false)
const store = useWidgetLayoutsStore()

/**
 * Define Props
 * 
 * col-num = number of columns in the grid
 * 
 */
const props = defineProps({
  colNum: {
    type: Number,
    default() {
      return 3
    },
  },
  tabs: {
    type: Boolean,
    default() {
      return true
    }
  }
})

const gridConfig = {
    colNum: props.colNum,
    rowHeight: 75,
    isDraggable: editable.value,
    isResizable: editable.value,
    isMirrored: false,
    verticalCompact: true,
    margin: [10, 10],
    useCssTransforms: false,
}

/**
 * Widget Layouts
 */

const defaultLayouts = {
  Default: {
    widgets: [
      { x: 0, y: 0, w: 1, h: 1, i: '0', name: 'WidgetsBlank', props: ref({}) },
      { x: 1, y: 0, w: 1, h: 1, i: '1', name: 'WidgetsBlank', props: ref({}) },
      { x: 2, y: 0, w: 1, h: 1, i: '2', name: 'WidgetsBlank', props: ref({}) },
      { x: 0, y: 0, w: 1, h: 1, i: '3', name: 'WidgetsBlank', props: ref({}) },
      { x: 1, y: 0, w: 1, h: 1, i: '4', name: 'WidgetsBlank', props: ref({}) },
    ],
    tabs: [
      {
        label: 'Core',
        widgets: [
        { x: 0, y: 0, w: 1, h: 1, i: '0', name: 'WidgetsBlank', props: ref({}) },
        { x: 1, y: 0, w: 1, h: 1, i: '1', name: 'WidgetsBlank', props: ref({}) },
        { x: 2, y: 0, w: 1, h: 1, i: '2', name: 'WidgetsBlank', props: ref({}) },
        ]
      },
      {
        label: 'Contacts',
        widgets: []
      },
    ]
  }
}
const savedLayouts = store.getLayouts('dashboard')

const filteredSavedLayouts = (typeof savedLayouts === 'object' && savedLayouts !== null)
  ? Object.fromEntries(
      Object.entries(savedLayouts).filter(([key, value]) => Array.isArray(value) && value.length > 0)
    )
  : {}
const layoutOptions = { ...defaultLayouts, ...filteredSavedLayouts }

const layoutKeys = Object.keys(layoutOptions)
const layoutChoices = ref(layoutKeys)
const layoutChoice = ref(layoutKeys[0])
const layout = ref(layoutOptions[layoutKeys[0]])

watch(layoutChoice, (newLayoutChoice) => {
  layout.value = layoutOptions[newLayoutChoice]
})

function toggleEdit() {
    editable.value = !editable.value
    store.updateLayout('dashboard', layoutChoice.value, layout.value)
}

/**
 * Tabs
 */
 const items = [{
  key: 'account',
  label: 'Account',
  description: 'Make changes to your account here. Click save when you\'re done.'
}, {
  key: 'password',
  label: 'Password',
  description: 'Change your password here. After saving, you\'ll be logged out.'
}]

/**
 * Widgets
 */

const widgetStore = useWidgetsStore()
const widgetOptions = widgetStore
  .getWidgets('dashboard')
  .map((widget) => ({
    [widget.name]: {
      name: widget.name,
      component: widget.component,
      props: ref(widget.props),
      height: widget.height,
      width: widget.width,
    },
  }))
  .reduce((acc, curr) => Object.assign(acc, curr), {} as Record<string, any>)

const widgetKeys = Object.keys(widgetOptions)
const widgetChoices = ref(widgetKeys)
const selectedWidget = ref(widgetKeys[0])

function removeWidget(widgetID) {
  layout.value.widgets = layout.value.widgets.filter(item => item.i !== widgetID)
}

function isOverLapping(candidateX, candidateY, candidateWidth, candidateHeight)
{
  return layout.value.widgets.some(item => {
    const occupiedXEnd = item.x + item.w
    const candidateXEnd = candidateX + candidateWidth
    const isXOverlap = candidateX < occupiedXEnd && candidateXEnd > item.x
    const isYOverlap = candidateY < item.y + item.h && candidateY + candidateHeight > item.y

    return isXOverlap && isYOverlap
  })
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function addWidget(widgetKey) {
  // Generate a unique identifier for the new widget
  const newWidgetId = generateUUID()

  console.log(widgetOptions[widgetKey])

  // Define the new widget
  const newWidget = {
    x: 0, // Set the initial X coordinate
    y: 0, // Set the initial Y coordinate
    w: widgetOptions[widgetKey]['width'], // Set the initial width
    h: widgetOptions[widgetKey]['height'], // Set the initial height
    i: newWidgetId, // Use the unique identifier as the item ID
    name: widgetOptions[widgetKey]['component'], // Replace 'YourWidgetComponent' with the actual component name
    props: ref(widgetOptions[widgetKey]['props']) || ref({}),
  }

  while(isOverLapping(newWidget.x, newWidget.y, newWidget.w, newWidget.h)) {
    newWidget.x = (newWidget.x + newWidget.w) % (gridConfig.colNum)
    if(newWidget.x == 0){
      newWidget.y+=1
    }
  }
  // Add the new widget to the layout
  layout.value.widgets.push(newWidget)
}

const openWidgetModal = (item) => {
  item.isOpen = true
}
</script>
<style>
.vue-grid-layout {
  display: block;
  /* Write the other styles for this component below */
}
.vue-grid-item > .vue-resizable-handle {
  background-image: url(data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYiIGhlaWdodD0iNiI+PHBhdGggZD0iTTYgNkgwVjQuMmg0LjJWMEg2djZ6IiBvcGFjaXR5PSIuMzAyIi8+PC9zdmc+)
}

@media (prefers-color-scheme: dark) {
  .dark .vue-grid-item > .vue-resizable-handle {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYiIGhlaWdodD0iNiI+PHBhdGggZD0iTTYgNkgwVjQuMmg0LjJWMEg2djZ6IiBvcGFjaXR5PSIuMzAyIiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyIvPjwvc3ZnPg==)
  }
}
</style>