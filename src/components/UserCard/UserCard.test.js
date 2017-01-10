import React from 'react'
import UserCard from './index.js'

describe('Test suite for UserCard component', () => {
  it('UserCard should exist', () => {
    let wrapper = shallow(<UserCard user={{}}/>)
    expect(wrapper).toMatchSnapshot()
  })
})
