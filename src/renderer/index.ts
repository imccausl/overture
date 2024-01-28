import type { PrerenderedElement, PropsWithChildren } from '../client/index.js'
import { TEXT_ELEMENT } from '../client/index.js'

type ValidHTMLAttributeTypes = string | undefined

const isValidHTMLAttribute = (
  attribute: unknown
): attribute is ValidHTMLAttributeTypes => {
  return typeof attribute === 'string' || typeof attribute === 'undefined'
}

const removeInvalidAttributes = <T extends Record<string, unknown>>(
  props: undefined | null | T
) => {
  return props
    ? Object.keys(props).reduce((acc, key) => {
        if (key === 'children') return acc
        if (key === 'className') {
          ;(acc as any)['class'] = props[key]
        }

        ;(acc as any)[key] = props[key]
        return acc
      }, {} as T)
    : undefined
}

const applyAttributes = <T extends Record<string, unknown>>(
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

const renderElement = <T extends Record<string, unknown>>(
  element: PrerenderedElement<PropsWithChildren<T>>
) => {
  let node = null
  if (typeof element.type === 'string') {
    switch (element.type) {
      case TEXT_ELEMENT:
        node = document.createTextNode('')
        break
      default:
        node = document.createElement(element.type)
        break
    }
  }

  if (Array.isArray(element.props?.children)) {
    for (const child of element.props.children) {
      node.appendChild(renderElement(child))
    }
  }

  return applyAttributes(node, element.props)
}

export const createRoot = <T extends Record<string, unknown>>(
  element: HTMLElement
) => {
  return {
    render: (component: PrerenderedElement<T>) => {
      element.innerHTML = ''
      element.appendChild(renderElement(component))
    },
  }
}
