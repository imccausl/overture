import { invariant } from '../util/invariant.js'

type ElementTypes<T> = string | ElementFn<T>

type ElementFn<T> = (props: T) => ElementTypes<T>

// this is not right as the child props isn't going to be an array
// of elements all witht he same props...
type ChildProps<T extends Record<string, unknown>> =
  | undefined
  | PrerenderedElement<PropsWithChildren<T>>

export type PropsWithChildren<T extends Record<string, unknown>> = T & {
  children?: null | string | Array<ChildProps<T>>
}

export type PrerenderedElement<T extends Record<string, unknown>> = {
  type: string | ElementFn<T>
  props: T
  _ref: any
}

export const TEXT_ELEMENT = 'TEXT_ELEMENT'

function Element<T extends Record<string, unknown>>({
  type,
  props,
  _ref,
}: {
  type: string | ElementFn<T>
  props: PropsWithChildren<T>
  _ref: any
}): PrerenderedElement<T> {
  return {
    type,
    props: { ...props },
    _ref,
  }
}

function createChildElements<T extends Record<string, unknown>>(
  childNodes: string | Array<string | PrerenderedElement<T>>
) {
  if (typeof childNodes === 'string') {
    return Element({
      type: TEXT_ELEMENT,
      props: { nodeValue: childNodes },
      _ref: undefined,
    })
  }

  return childNodes?.map((child) => {
    if (typeof child === 'string') {
      return Element({
        type: TEXT_ELEMENT,
        props: { nodeValue: child },
        _ref: undefined,
      })
    }

    return child
  })
}

function createElement<T extends Record<string, unknown>>(
  type: ElementTypes<T>,
  config?: PropsWithChildren<T>,
  ...childElements: undefined | Array<string | PrerenderedElement<T>>
): PrerenderedElement<PropsWithChildren<T>> {
  invariant(
    !childElements.length ||
      !(typeof config.children === 'string' || Array.isArray(config.children)),
    'Cannot have children props and additional arguments to createElement'
  )

  const {
    ref = undefined,
    children = undefined,
    ...restProps
  } = config ?? ({} as Partial<PropsWithChildren<T>>)
  const childNodes = children
    ? createChildElements(children)
    : createChildElements(childElements)
  const props: PropsWithChildren<T> = {
    children: childNodes,
    ...restProps,
  } as PropsWithChildren<T>

  return Element({ type, props, _ref: ref })
}

// createElement('div', { id: 'app' }, 'Hello World')
// createElement('div', { id: 'app' }, createElement('h1', {}, 'Hello World')
// createElement('div', { id: 'app' }, createElement('h1', {}, 'Hello World'), createElement('p', {}, 'Hello World'))

export { createElement }
