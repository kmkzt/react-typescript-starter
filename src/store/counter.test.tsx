import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { CounterProvider, counterStore } from './counter'
import { Counter as Container } from '@/components/Counter'

describe('CounterProvider', () => {
  const render = mount(
    <CounterProvider>
      <Container />
    </CounterProvider>
  )
  it('snapshot', () => {
    expect(toJson(render)).toMatchSnapshot()
  })
  it('Component props test', () => {
    const Component = render.children().children()
    expect(Component.prop('count')).toBe(0)
    expect(Component.prop('increment')).toBeDefined()
    expect(Component.prop('decrement')).toBeDefined()
    expect(Component.prop('reset')).toBeDefined()
  })
})
