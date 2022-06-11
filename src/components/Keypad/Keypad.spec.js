import React from 'react';
import { shallow } from 'enzyme';
import Keypad from "./Keypad";
import Key from "../Key/Key";

describe("Keypad", () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Keypad 
        callOperator={jest.fn()}
        numbers={[]}
        operators={[]}
        setOperator={jest.fn()}
        updateDisplay={jest.fn()}
    />))

    it("should contain 3 divs", () => {
        expect(wrapper.find("div").length).toEqual(3)
    })

    it("should render the values of numbers props", () => {
        wrapper.setProps({numbers: ["1", "2", "3"]})
        expect(wrapper.find(".numbers-container").text()).toEqual("123")
    })

    it("should render the values of operator props", () => {
        wrapper.setProps({operators: ['+', '-', '*', '/']})
        expect(wrapper.find(".operators-container").text()).toEqual("+-*/")
    })

    it("should render Key component", () => {
        expect(wrapper.containsMatchingElement(<Key />)).toEqual(true)
    })

    it("should contain one instance of Key component", () => {
        expect(wrapper.find('Key').length).toEqual(1)
    })
})