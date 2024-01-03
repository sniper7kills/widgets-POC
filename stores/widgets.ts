interface Widget {
  name: string;
  component: string;
  height: number;
  width: number;
  props: Record<string, any>; // Adjust this to the actual structure of widget properties
  pages: string[];
}

interface WidgetsState {
  widgets: Widget[];
}

export const useWidgetsStore = defineStore('widgets', {
  state: (): WidgetsState => ({
    widgets: [
      {
        name: 'Blank Widget',
        component: 'WidgetsBlank',
        height: 1,
        width: 1,
        props: {},
        pages: ['all'],
      },
      {
        name: 'Divider',
        component: 'WidgetsDivider',
        height: 1,
        width: 3,
        props: {
          label: 'Divider'
        },
        pages: ['all'],
      },
      {
        name: 'Markdown',
        component: 'WidgetsMarkdown',
        height: 1,
        width: 1,
        props: {content: '# Default Content'},
        pages: ['all'],
      },
    ],
  }),
  getters: {
    getWidgets: (state) => (page: string) =>
      state.widgets.filter(
        (widget) => widget.pages.includes('all') || widget.pages.includes(page)
      ),
  },
})
