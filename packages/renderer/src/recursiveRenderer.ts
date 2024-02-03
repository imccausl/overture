import { PrerenderedElement, PropsWithChildren } from '@overture/core'
import { isFunctionalComponent } from '@overture/core/typeguards'
import { createDOM, applyAttributes } from './DOMUtils.js'
import { renderFunctionalComponent } from './reconciler.js'
export const recursivelyRenderElement = <T extends Record<string, unknown>>(
  element: PrerenderedElement<PropsWithChildren<T>>
): HTMLElement | Text => {
  if (isFunctionalComponent(element)) {
    return recursivelyRenderElement(renderFunctionalComponent(element))
  }

  const node = createDOM(element)

  if (Array.isArray(element.props?.children)) {
    for (const child of element.props.children) {
      node.appendChild(recursivelyRenderElement(child))
    }
  }

  return applyAttributes(node, element.props)
}
