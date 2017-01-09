import React from 'react'
import Card from './index.js'

describe('Test suite for Card component', () => {
  it('Card should exist', () => {
    let wrapper = shallow(<Card/>)
    expect(wrapper).toMatchSnapshot()
  })
})

