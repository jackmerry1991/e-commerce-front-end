import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure, shallow } from 'enzyme'
import React from 'react'
import App from './App'
/**
 * @jest-environment jsdom
 */
configure({ adapter: new Adapter() })
test('renders without crashing', () => {
    shallow(<App />)
})
