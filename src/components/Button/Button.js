import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";

const Button = ({ type = "secondary", direction = "default", handler = () => null, children, aria }) => {
	const handleMouseDown = () => handler();

	return type === "secondary" ? (
		<button className="secondary" onMouseDown={handleMouseDown} aria-label={aria}>
			{children}
		</button>
	) : type === "arrow" ? (
		<button type="button" className={`round ${direction}`} onMouseDown={handleMouseDown} aria-label={aria}>
			<Arrow />
		</button>
	) : null;
};

Button.propTypes = {
	type: PropTypes.oneOf(["arrow", "secondary"]),
	direction: PropTypes.oneOf(["default", "alternate"]),
	handler: PropTypes.func,
	children: PropTypes.node,
	aria: PropTypes.string,
};

export default Button;
