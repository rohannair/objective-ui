import React from 'react'
import LoadingBar from './index.js'

describe('Test suite for LoadingBar component', () => {
  it('LoadingBar should exist', () => {
    let wrapper = shallow(<LoadingBar/>)
    expect(wrapper).toMatchSnapshot()
  })
})

