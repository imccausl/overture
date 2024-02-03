import { createRoot } from '@overture/renderer'
import type { PrerenderedElement } from '@overture/core'

export const render = <T extends Record<string, unknown>>(
  element: PrerenderedElement<T>
) => {
  const root = document.createElement('div')
  root.id = 'app-root'
  document.body.appendChild(root)
  const rootElement = createRoot(root)
  rootElement.render(element)

  return {
    unmount: () => root.remove(),
  }
}
