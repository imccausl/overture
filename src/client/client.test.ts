import { screen } from '@testing-library/dom'
import { render } from '../testUtils/render.js'
import { createElement } from './index.js'

describe('creating elements', () => {
  it('creates an element object with tag name', () => {
    const element = createElement('p', {})
    expect(element).toBe(
      expect.objectContaining({
        type: 'p',
        props: {},
        _ref: undefined,
      })
    )
  })

  it.only('creates an array of objects for children if passed as additional arguments', () => {
    const element = createElement(
      'div',
      {},
      createElement('p'),
      createElement('span')
    )
    console.log(JSON.stringify(element, null, 2))
    expect(element.props.children).toEqual([
      expect.objectContaining({
        type: 'p',
        props: expect.objectContaining({
          children: [],
        }),
        _ref: undefined,
      }),
      expect.objectContaining({
        type: 'span',
        props: expect.objectContaining({
          children: [],
        }),
        _ref: undefined,
      }),
    ])
  })

  it('should add attributes', () => {
    const props = {
      onClick: () => {},
    }
    const element = createElement('div', props)

    render(element)
    screen.debug()
  })
})
