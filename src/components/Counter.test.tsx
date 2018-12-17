import * as React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import { Component as Counter } from './Counter'

describe('Counter コンポーネント', () => {
  it('render', () => {
    const tree = mount(<Counter count={0} />)
    expect(toJson(tree)).toMatchSnapshot()
  })
})
