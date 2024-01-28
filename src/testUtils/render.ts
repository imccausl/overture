import { createRoot } from '../renderer/index.js'
import type { PrerenderedElement } from '../client/index.js'

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
