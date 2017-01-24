import React from 'react'

import Modal from './index.js'

describe('Test suite for Modal component', () => {
  it('Modal should exist', () => {
    let wrapper = shallow(<Modal/>)
    expect(wrapper).toMatchSnapshot()
  })
})

