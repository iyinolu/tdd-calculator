import React from "react";
import { shallow } from "enzyme";
import Calculator from "./Calculator";
import Display from "../Display/Display";
import KeyPad from "../Keypad/Keypad";

describe("Calculator", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("should render properly", () => {
      expect(wrapper).toMatchSnapshot()
  })

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
