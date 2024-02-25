import { type PrerenderedElement } from '@overture/core'
import { TEXT_ELEMENT } from 'shared'

import {
    isValidHTMLAttribute,
    removeInvalidAttributes,
} from './HTMLValidators.js'

import type { Fiber } from './fastRenderer.js'

export const createDOM = <T extends Record<string, unknown>>(
    element: PrerenderedElement<T> | Fiber<T>,
) => {
    if (typeof element.type !== 'string')
        throw new Error('Invalid element type')

    const dom =
        element.type === TEXT_ELEMENT
            ? document.createTextNode('')
            : document.createElement(element.type)

    return applyAttributes(dom, element.props)
}

function applyAttributes<T extends Record<string, unknown>>(
    element: HTMLElement | Text,
    props: T | null | undefined,
) {
    const validProps = removeInvalidAttributes(props)
    if (!validProps) return element

    for (const [key, value] of Object.entries(validProps)) {
        if (key.startsWith('on')) {
            const event = key.slice(2).toLowerCase()
            if (typeof value === 'function') {
                element.addEventListener(event, value as EventListener)
            }
        } else if (key === 'nodeValue' && typeof value === 'string') {
            element.nodeValue = value
        } else {
            if (isValidHTMLAttribute(value)) {
                if (element instanceof HTMLElement) {
                    element.setAttribute(key, value)
                }
            }
        }
    }

    return element
}
