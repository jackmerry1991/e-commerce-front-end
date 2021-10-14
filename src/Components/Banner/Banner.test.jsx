import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Banner from './Banner'
import './Banner.css'

// import renderer from 'react-test-renderer'
configure({ adapter: new Adapter() })
describe('Banner Component', () => {
    it('Search bar contains an empty string', () => {
        const wrapper = shallow(<Banner />)
        const text = wrapper.find('input').text()
        expect(text).toEqual('')
    })
})
