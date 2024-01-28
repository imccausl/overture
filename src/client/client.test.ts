import Overture from './index.js'

describe('creating elements', () => {
  it('creates an element object with tag name', () => {
    const element = Overture.createElement('p', {})
    expect(element).toBe(
      expect.objectContaining({
        type: 'p',
        props: {},
        _ref: undefined,
      })
    )
  })

  it.only('creates an array of objects for children if passed as additional arguments', () => {
    const element = Overture.createElement(
      'div',
      {},
      Overture.createElement('p'),
      Overture.createElement('span')
    )

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
    const element = Overture.createElement('div', props)

    expect(element.props).toEqual(
      expect.objectContaining({
        onClick: props.onClick,
      })
    )
  })
})
