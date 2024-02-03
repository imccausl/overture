import { PrerenderedElement } from '@overture/core'
import { TEXT_ELEMENT } from 'shared'

export const createDOM = <T extends Record<string, unknown>>(
  element: PrerenderedElement<T>
) => {
  if (typeof element.type !== 'string') return null

  return element.type === TEXT_ELEMENT
    ? document.createTextNode('')
    : document.createElement(element.type)
}

import {
  removeInvalidAttributes,
  isValidHTMLAttribute,
} from './HTMLValidators.js'

export const applyAttributes = <T extends Record<string, unknown>>(
  element: HTMLElement | Text,
  props: T | null | undefined
) => {
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
