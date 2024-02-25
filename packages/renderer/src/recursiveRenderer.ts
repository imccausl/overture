import { type PrerenderedElement, type PropsWithChildren } from '@overture/core'

import { createDOM } from './DOMUtils.js'

const recursivelyRenderElement = <T extends Record<string, unknown>>(
    element: PrerenderedElement<PropsWithChildren<T>>,
): HTMLElement | Text => {
    if ('rerender' in element) {
        return recursivelyRenderElement(
            element.rerender.next(element.props).value,
        )
    }

    const node = createDOM(element)

    if (Array.isArray(element.props?.children)) {
        for (const child of element.props.children) {
            node.appendChild(recursivelyRenderElement(child))
        }
    }

    return node
}

export const recursiveRenderer = <T extends Record<string, unknown>>(
    element: PrerenderedElement<PropsWithChildren<T>>,
    container: HTMLElement,
) => {
    container.appendChild(recursivelyRenderElement(element))
}
