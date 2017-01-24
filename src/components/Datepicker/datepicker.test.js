import React from 'react'

import Datepicker from './index.js'

describe('Test suite for Datepicker component', () => {
  it('Datepicker should exist', () => {
    let wrapper = shallow(<Datepicker />)
    expect(wrapper).toMatchSnapshot()
  })
})

