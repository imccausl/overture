type ValidHTMLAttributeTypes = string | undefined

export const isValidHTMLAttribute = (
    attribute: unknown,
): attribute is ValidHTMLAttributeTypes => {
    return typeof attribute === 'string' || typeof attribute === 'undefined'
}

export const removeInvalidAttributes = <T extends Record<string, unknown>>(
    props: undefined | null | T,
) => {
    return props
        ? Object.keys(props).reduce<T>((acc, key) => {
              if (key === 'children') return acc
              if (key.toLowerCase() === 'classname') {
                  ;(acc as any)['class'] = props[key]
                  return acc
              }

              ;(acc as any)[key] = props[key]
              return acc
          }, {})
        : undefined
}
