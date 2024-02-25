import { TEXT_ELEMENT } from 'shared'

import { invariant } from '../util/invariant.js'

export type ElementTypes<T extends Record<string, unknown>> =
    | string
    | ElementFn<T>

export interface PrerenderedFunctionalElement<T extends Record<string, unknown>>
    extends PrerenderedElement<T> {
    type: ElementFn<T>
}

export type ElementFn<T extends Record<string, unknown>> = (
    props: T,
) => PrerenderedElement<T>

// this is not right as the child props isn't going to be an array
// of elements all witht he same props...
type ChildProps<T extends Record<string, unknown>> =
    | undefined
    | PrerenderedElement<PropsWithChildren<T>>

export type PropsWithChildren<T extends Record<string, unknown>> = T & {
    children?: null | string | ChildProps<T>[]
}

export interface PrerenderedElement<T extends Record<string, unknown>> {
    type: string | ElementFn<T>
    props: T
    _ref: any
}

function Element<T extends Record<string, unknown>>({
    type,
    props,
    _ref,
}: {
    type: string | ElementFn<T>
    props: PropsWithChildren<T>
    _ref: any
}): PrerenderedElement<T> {
    const element: PrerenderedElement<T> = {
        type,
        props: { ...props },
        _ref,
    }

    return element
}

function createChildElements<T extends Record<string, unknown>>(
    childNodes: string | (string | PrerenderedElement<T>)[],
) {
    if (typeof childNodes !== 'object') {
        return Element({
            type: TEXT_ELEMENT,
            props: { nodeValue: childNodes },
            _ref: undefined,
        })
    }

    return childNodes?.map((child) => {
        if (typeof child !== 'object') {
            return Element({
                type: TEXT_ELEMENT,
                props: { nodeValue: `${child}` },
                _ref: undefined,
            })
        }

        return child
    })
}

export function createElement<T extends Record<string, unknown>>(
    type: ElementTypes<T>,
    config?: null | PropsWithChildren<T>,
    ...childElements: undefined | (string | PrerenderedElement<T>)[]
): PrerenderedElement<PropsWithChildren<T>> {
    const overlappingChildArgs =
        !childElements.length ||
        !(
            typeof config?.children === 'string' ||
            (Array.isArray(config?.children) && config.children.length)
        )
    invariant(
        overlappingChildArgs,
        'Cannot have children props and additional arguments to createElement',
    )
    const {
        ref = undefined,
        children = undefined,
        ...restProps
    } = config ?? ({} as Partial<PropsWithChildren<T>>)
    const childNodes =
        (children !== undefined && typeof children !== 'object') ||
        children?.length
            ? createChildElements(children)
            : createChildElements(childElements.flat()) // jsx passes in an array of an array of elements
    const props: PropsWithChildren<T> = {
        children: childNodes,
        ...restProps,
    } as PropsWithChildren<T>

    return Element({ type, props, _ref: ref })
}
