import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";
import Payments from "./payments";


configure({adapter: new Adapter()});

describe('Test Pyments Compnent', function () {
  it('Payments Component should exist', function () {
    const wrapper = shallow(<Payments/>);
    expect(wrapper.exists()).toBe(true)
  });

  // beforeEach(() => {
  //     global.fetch = jest.fn();
  //     // window.fetch = jest.fn();
      
  // })
});
