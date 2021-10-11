import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";
import App from "./app";
import Payments from "./payments";


configure({adapter: new Adapter()});

describe('Test App Entry point', function () {
  const wrapper = shallow(<App/>);

  it('App Component should exist.', function () {
    expect(wrapper.exists()).toBeDefined();
  });

  it('App Component should contain Payments Component.', function () {
    expect(wrapper.contains(<Payments />)).toBe(true)
  });
});
