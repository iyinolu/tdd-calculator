import React from "react";
import { shallow } from "enzyme";
import Display from "./Display";

describe("Display", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Display displayValue={" "} />)));

  it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot()
  })

  it("should contain one div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("should render display value properly", () => {
      wrapper.setProps({displayValue: "test"})
      expect(wrapper.text()).toEqual("test")
  })
});
