import type { PrerenderedElement } from '../../core/src/element/index.js'
import { recursivelyRenderElement } from './recursiveRenderer.js'

const createRootWithRenderer = <T extends Record<string, unknown>>(
  element: HTMLElement,
  renderer: (component: PrerenderedElement<T>) => HTMLElement | Text
) => {
  return {
    render: (component: PrerenderedElement<T>) => {
      element.innerHTML = ''
      element.appendChild(renderer(component))
    },
  }
}

export const createRoot = <T extends Record<string, unknown>>(
  element: HTMLElement
) => createRootWithRenderer<T>(element, recursivelyRenderElement)
