import React from 'react'
import PageHeader from './index.js'

describe('Test suite for PageHeader component', () => {
  it('PageHeader should exist', () => {
    let wrapper = shallow(<PageHeader/>)
    expect(wrapper).toMatchSnapshot()
  })
})

