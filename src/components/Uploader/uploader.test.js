import React from 'react'

import Uploader from './index.js'

describe('Test suite for Uploader component', () => {
  it('Uploader should exist', () => {
    let cb = jest.fn()
    let wrapper = shallow(<Uploader submitImage={cb} />)
    expect(wrapper).toMatchSnapshot()
  })
})

