import React from "react";
import { shallow } from "enzyme";
import { Button } from "..";

describe("Button component", () => {
	it("renders with default props", () => {
		const wrapper = shallow(<Button />);

		expect(wrapper.find("button").hasClass("secondary")).toBeTruthy();
	});

	it("renders children", () => {
		const wrapper = shallow(<Button>test</Button>);

		expect(wrapper.find("button").text()).toBe("test");
	});

	it("renders arrow type button", () => {
		const wrapper = shallow(<Button type="arrow" />);

		expect(wrapper.find("button").hasClass("round")).toBeTruthy();
	});
});
