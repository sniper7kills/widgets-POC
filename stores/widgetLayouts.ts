interface Widget {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  name: string;
  props: Record<string, any>;
}

interface LayoutsState {
  layouts: Record<string, Widget[]>;
  defaultLayouts: Record<string, string>;
}

export const useWidgetLayoutsStore = defineStore('widget-layouts', {
  state: (): LayoutsState => ({
    layouts: {},
    defaultLayouts: {},
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {
    getLayouts: (state) => (page: string) => state.layouts[page],
    getDefaultLayouts: (state) => (page: string) => state.defaultLayouts[page],
  },
  actions: {
    updateLayout(page: string, layout: string, content: Widget[]) {
      if (!this.layouts[page]) {
        this.layouts[page] = {}
      }
      this.layouts[page][layout] = content
    },
    updateDefaultLayout(page: string, layout: string, content: Widget[]) {
      if (!this.defaultLayouts[page]) {
        this.defaultLayouts[page] = {}
      }
      this.defaultLayouts[page][layout] = content
    },
  },
})