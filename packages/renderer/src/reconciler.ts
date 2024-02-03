import type {
  PrerenderedFunctionalElement,
  PropsWithChildren,
} from '@overture/core'

export const renderFunctionalComponent = <T extends Record<string, unknown>>(
  element: PrerenderedFunctionalElement<PropsWithChildren<T>>
) => {
  return element.type(element.props)
}
