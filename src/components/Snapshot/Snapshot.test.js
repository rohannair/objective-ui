import React from 'react'
import Snapshot from './index.js'

describe('Test suite for Snapshot component', () => {
  it('Snapshot should exist', () => {
    let wrapper = shallow(<Snapshot snap={{}} showObjective={true}/>)
    expect(wrapper.find('UserTab')).toHaveLength(1)
    expect(wrapper).toBeDefined()
  })
})
