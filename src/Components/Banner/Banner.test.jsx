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

    it("Menu class changes to mobile-drop-down-open on button click", () => {
        const wrapper = shallow(<Banner />);
        wrapper.find(".mobile-burger-menu").simulate("click");
        expect(wrapper.find("mobile-drop-down-open")).toBeTruthy();
      });

      it("Overlay class changes on button click", () => {
        const wrapper = shallow(<Banner />);
        wrapper.find(".mobile-burger-menu").simulate("click");
        expect(wrapper.find("menu-overlay-active")).toBeTruthy();
      });

})

