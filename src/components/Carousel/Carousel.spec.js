import React from "react";
import { shallow } from "enzyme";
import Carousel from "./Carousel";

describe("Button component", () => {
	const heading = "test heading";
	const subHeading = "subHeading testing";
	const dataArr = [
		{
			id: "1",
			imageSrc: "/test",
			imageAlt: "alt test",
			heading: "test heading",
			content: "test content",
			width: 100,
		},
		{
			id: "2",
			imageSrc: "/test",
			imageAlt: "alt test",
			heading: "test heading",
			content: "test content",
			width: 100,
		},
		{
			id: "3",
			imageSrc: "/test",
			imageAlt: "alt test",
			heading: "test heading",
			content: "test content",
			width: 100,
		},
	];

	const wrapper = shallow(<Carousel heading={heading} subHeading={subHeading} items={dataArr} />);

	it("matches snapshot", () => {
		expect(wrapper).toMatchSnapshot();
	});
	it("renders header", () => {
		expect(wrapper.find(".carousel__header").find("h1").text()).toBe(heading);
	});

	it("renders subHeader", () => {
		expect(wrapper.find(".carousel__header").find("h3").text()).toBe(subHeading);
	});

	it("renders carousel items", () => {
		expect(wrapper.find(".carousel__content").children().length).toBe(3);
	});
});
