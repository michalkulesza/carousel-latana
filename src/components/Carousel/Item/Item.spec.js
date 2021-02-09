import React from "react";
import { shallow } from "enzyme";
import Item from "./Item";

describe("Item component", () => {
	const imageSrc = "/test";
	const imageAlt = "test description";
	const heading = "test heading";
	const content = "hello world";

	const wrapper = shallow(
		<Item imageSrc={imageSrc} imageAlt={imageAlt} heading={heading} content={content} width={500} />
	);

	it("renders image with correct src and alt", () => {
		expect(wrapper.find("img").prop("src")).toBe(imageSrc);
		expect(wrapper.find("img").prop("alt")).toBe(imageAlt);
	});

	it("renders heading", () => {
		expect(wrapper.find("h2").text()).toBe(heading);
	});

	it("renders content", () => {
		expect(wrapper.find(".item__content").find("p").text()).toBe(content);
	});
});
