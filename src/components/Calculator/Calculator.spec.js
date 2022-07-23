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

describe("updateDisplay", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("updates display value", () => {
    wrapper.instance().updateDisplay("5");
    expect(wrapper.state("displayValue")).toEqual("5");
  });

  it("concatenates display value", () => {
    wrapper.instance().updateDisplay("4");
    wrapper.instance().updateDisplay("5");
    expect(wrapper.state("displayValue")).toEqual("45");
  });

  it("removes leading '0' from display value", () => {
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayValue")).toEqual("0");
    wrapper.instance().updateDisplay("5");
    expect(wrapper.state("displayValue")).toEqual("5");
  });

  it("prevent multiple leading zeros", () => {
    wrapper.instance().updateDisplay("0");
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it("removes last character of displayValue when equals to ce", () => {
    wrapper.instance().updateDisplay("7");
    wrapper.instance().updateDisplay("8");
    wrapper.instance().updateDisplay("ce");
    expect(wrapper.state("displayValue")).toEqual("7");
  });

  it("prevents multiple instance of .", () => {
    wrapper.instance().updateDisplay(".");
    wrapper.instance().updateDisplay(".");
    expect(wrapper.state("displayValue")).toEqual(".");
  });

  it("would display value to '0' if displayValue is equal to an empty string", () => {
    wrapper.instance().updateDisplay("ce");
    expect(wrapper.state("displayValue")).toEqual("0");
  });
});

describe("setOperator", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("updates the value of selected operator", () => {
    wrapper.instance().setOperator("+");
    expect(wrapper.state("selectedOperator")).toEqual("+");
    wrapper.instance().setOperator("/");
    expect(wrapper.state("selectedOperator")).toEqual("/");
  });

  it("updates the value of storedValue to the value of displayValue", () => {
    wrapper.setState({ displayValue: "8" });
    wrapper.instance().setOperator("+");
    expect(wrapper.state("storedValue")).toEqual("8");
  });

  it("updates the value of displayValue to 0", () => {
    wrapper.instance().updateDisplay("9");
    wrapper.instance().setOperator("+");
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it("does not update stored value when setOperator is called with empty displayValue (i.e displayValue = 0)", () => {
    wrapper.instance().updateDisplay("5");
    wrapper.instance().setOperator("+");
    expect(wrapper.state("storedValue")).toEqual("5");
    wrapper.instance().setOperator("/");
    expect(wrapper.state("storedValue")).toEqual("5");
  });
});

describe("callOperator", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("updates display to the sum of storedValue and displayValue", () => {
    wrapper.setState({ storedValue: "8" });
    wrapper.setState({ displayValue: "8" });
    wrapper.setState({ selectedOperator: "+" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("16");
  });

  it("updates display to the difference of storedValue and displayValue", () => {
    wrapper.setState({ storedValue: "10" });
    wrapper.setState({ displayValue: "8" });
    wrapper.setState({ selectedOperator: "-" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("2");
  });

  it("updates display to the product of storedValue and displayValue", () => {
    wrapper.setState({ storedValue: "10" });
    wrapper.setState({ displayValue: "8" });
    wrapper.setState({ selectedOperator: "x" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("80");
  });

  it("updates display to the quotient of storedValue and displayValue", () => {
    wrapper.setState({ storedValue: "10" });
    wrapper.setState({ displayValue: "8" });
    wrapper.setState({ selectedOperator: "/" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("1.25");
  });

  it('updates displayValue to "0" if operation results in "NaN"', () => {
    wrapper.setState({ storedValue: "10" });
    wrapper.setState({ displayValue: "string" });
    wrapper.setState({ selectedOperator: "/" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it('updates displayValue to "0" if operation results in "Infinity"', () => {
    wrapper.setState({ storedValue: "7" });
    wrapper.setState({ displayValue: "0" });
    wrapper.setState({ selectedOperator: "/" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it('updates displayValue to "0" if selectedOperator does not match cases', () => {
    wrapper.setState({ storedValue: "7" });
    wrapper.setState({ displayValue: "4" });
    wrapper.setState({ selectedOperator: "string" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("0");
  });
  
  it('updates displayValue to "0" if called with no value for storedValue or selectedOperator', () => {
    wrapper.setState({ storedValue: "" });
    wrapper.setState({ displayValue: "5" });
    wrapper.setState({ selectedOperator: "+" });
    wrapper.instance().callOperator();
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it('updates display value to the correct decimal answer', () => {
      wrapper.setState({displayValue: "5.3"})
      wrapper.setState({storedValue: "5.3"})
      wrapper.setState({selectedOperator: "+"})
      wrapper.instance().callOperator()
      expect(wrapper.state("displayValue")).toEqual("10.6")
  })
});
