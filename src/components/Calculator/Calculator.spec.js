import React from "react";
import { shallow, mount } from "enzyme";
import Calculator from "./Calculator";
import Display from "../Display/Display";
import KeyPad from "../Keypad/Keypad";

describe("Calculator", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("should render Display and Keypad component", () =>
    expect(
      wrapper.containsAllMatchingElements([
        <Display />,
        <KeyPad
          callOperator={wrapper.instance().callOperator}
          numbers={wrapper.instance().state.numbers}
          operators={wrapper.instance().state.operators}
          setOperator={wrapper.instance().setOperator}
          updateDisplay={wrapper.instance().updateDisplay}
        />,
      ])
    ).toEqual(true));
});

describe("Calculator mounted", () => {
  let wrapper;
  beforeEach(() => (wrapper = mount(<Calculator />)));

  it("calls updateDisplay callback when a number key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "updateDisplay");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find(".number-key").first().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("calls setOperator callback when an operator key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "setOperator");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find(".operator-key").first().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("calls callOperator callback when submit key is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "callOperator");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find(".submit-key").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
