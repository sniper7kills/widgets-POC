export function isOverLapping(layout, candidateX, candidateY, candidateWidth, candidateHeight)
{
  return layout.some(item => {
    const occupiedXEnd = item.x + item.w
    const candidateXEnd = candidateX + candidateWidth
    const isXOverlap = candidateX < occupiedXEnd && candidateXEnd > item.x
    const isYOverlap = candidateY < item.y + item.h && candidateY + candidateHeight > item.y

    return isXOverlap && isYOverlap
  })
}

/**
 * TODO: Remove the need for this function.
 */
export function generateWidgetId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

type Widget = {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
    name: string;
    props: Record<string, any>;
  };

type WidgetTab = {
    label: string;
    widgets: Widget[];
};

type WidgetLayout = {
    widgets: Widget[];
    tabs: WidgetTab[];
};

type WidgetLayouts = {
    [key: string]: WidgetLayout;
}

export function getLayoutsForPage(page: string, defaultLayouts: WidgetLayouts): WidgetLayouts
{
    const store = useWidgetLayoutsStore()
    const savedLayouts = store.getLayouts(page)

    const filteredSavedLayouts: WidgetLayouts = (typeof savedLayouts === 'object' && savedLayouts !== null)
  ? Object.fromEntries(
      Object.entries(savedLayouts).filter(([key, value]) => Array.isArray(value.widgets) && value.widgets.length > 0)
    )
  : {}

    return { ...defaultLayouts, ...filteredSavedLayouts}
}
