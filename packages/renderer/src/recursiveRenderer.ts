import { type PrerenderedElement, type PropsWithChildren } from '@overture/core'

import { applyAttributes, createDOM } from './DOMUtils.js'

export const recursivelyRenderElement = <T extends Record<string, unknown>>(
    element: PrerenderedElement<PropsWithChildren<T>>,
): HTMLElement | Text => {
    if ('rerender' in element) {
        return recursivelyRenderElement(
            element.rerender.next(element.props).value,
        )
    }

    const node = typeof element.type === 'string' ? createDOM(element) : null

    if (Array.isArray(element.props?.children)) {
        for (const child of element.props.children) {
            node.appendChild(recursivelyRenderElement(child))
        }
    }

    return applyAttributes(node, element.props)
}
