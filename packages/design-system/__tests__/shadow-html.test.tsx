import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ShadowHtml } from '../src/components/shadow-html'

describe('ShadowHtml', () => {
  it('renders a host div with data-component', () => {
    const { container } = render(<ShadowHtml css="" html="<p>hi</p>" />)
    const host = container.querySelector('[data-component="shadow-html"]')
    expect(host).not.toBeNull()
  })

  it('attaches a shadow root containing the injected style and html', () => {
    const { container } = render(
      <ShadowHtml css=".foo{color:red}" html={'<p class="foo">hi</p>'} />,
    )
    const host = container.querySelector(
      '[data-component="shadow-html"]',
    ) as HTMLElement
    expect(host.shadowRoot).not.toBeNull()
    expect(host.shadowRoot?.innerHTML).toContain(
      '<style>.foo{color:red}</style>',
    )
    expect(host.shadowRoot?.innerHTML).toContain('<p class="foo">hi</p>')
  })

  it('updates shadow root content when props change without throwing', () => {
    const { container, rerender } = render(
      <ShadowHtml css="" html="<p>first</p>" />,
    )
    const host = container.querySelector(
      '[data-component="shadow-html"]',
    ) as HTMLElement
    expect(host.shadowRoot?.innerHTML).toContain('first')
    rerender(<ShadowHtml css="" html="<p>second</p>" />)
    expect(host.shadowRoot?.innerHTML).toContain('second')
    expect(host.shadowRoot?.innerHTML).not.toContain('first')
  })
})
