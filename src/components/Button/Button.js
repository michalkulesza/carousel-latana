import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";

const Button = ({ type = "secondary", direction = "default", handler = () => null, children }) => {
	const handleMouseDown = () => handler();

	return type === "secondary" ? (
		<button className="secondary" onMouseDown={handleMouseDown}>
			{children}
		</button>
	) : type === "arrow" ? (
		<button className={`round ${direction}`} onMouseDown={handleMouseDown}>
			<Arrow />
		</button>
	) : null;
};

Button.propTypes = {
	type: PropTypes.oneOf(["arrow", "secondary"]),
	direction: PropTypes.oneOf(["default", "alternate"]),
	handler: PropTypes.func,
	children: PropTypes.node,
};

export default Button;
