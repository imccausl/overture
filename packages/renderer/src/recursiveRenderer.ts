import { type PrerenderedElement, type PropsWithChildren } from '@overture/core'
import { isFunctionalComponent } from '@overture/core/typeguards'
import { HookDispatcher } from 'shared'

import { applyAttributes, createDOM } from './DOMUtils.js'

export const recursivelyRenderElement = <T extends Record<string, unknown>>(
    element: PrerenderedElement<PropsWithChildren<T>>,
): HTMLElement | Text => {
    let node = null
    console.log({ element })
    if (typeof element.type === 'string') {
        node = createDOM(element)
    }

    if (Array.isArray(element.props?.children)) {
        for (const child of element.props.children) {
            console.log({ child })
            node.appendChild(recursivelyRenderElement(child))
        }
    }

    return applyAttributes(node, element.props)
}
