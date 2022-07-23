import React from "react";
import { shallow, mount } from "enzyme";
import Keypad from "./Keypad";

describe("Keypad", () => {
  let wrapper;
  beforeEach(
    () =>
      (wrapper = shallow(
        <Keypad
          callOperator={jest.fn()}
          numbers={[]}
          operators={[]}
          setOperator={jest.fn()}
          updateDisplay={jest.fn()}
        />
      ))
  );

  it("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should contain 4 divs", () => {
    expect(wrapper.find("div").length).toEqual(4);
  });

  it("should contain one instance of Key component", () => {
    expect(wrapper.find("Key").length).toEqual(1);
  });

  it("should render an instance of Key component for each index of numbers, operators and the submit key", () => {
    const numbers = ["1", "2", "3"];
    const operators = ["+", "-", "/"];
    const submit = 1;
    const keyTotal = numbers.length + operators.length + submit;
    wrapper.setProps({ numbers, operators });
    expect(wrapper.find("Key").length).toEqual(keyTotal);
  });
});

describe("mounted Keypad", () => {
  let wrapper;
  beforeEach(
    () =>
      (wrapper = mount(
        <Keypad
          callOperator={jest.fn()}
          setOperator={jest.fn()}
          updateDisplay={jest.fn()}
          operators={[]}
          numbers={[]}
        />
      ))
  );

  it("renders the value of numbers to DOM", () => {
    wrapper.setProps({ numbers: ["1", "2", "3"] });
    expect(wrapper.find(".numbers-container").text()).toEqual("123");
  });

  it("renders the values of operators to DOM", () => {
    wrapper.setProps({ operators: ["+", "/", "-"] });
    expect(wrapper.find(".operators-container").text()).toEqual("+/-");
  });
});
