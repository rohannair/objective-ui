import React from 'react'
import SettingsProfile from './index.js'

describe('Test suite for SettingsProfile component', () => {
  it('SettingsProfile should exist', () => {
    let wrapper = shallow(<SettingsProfile/>)
    expect(wrapper).toMatchSnapshot()
  })
})

