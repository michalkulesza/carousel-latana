import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";

const Button = ({ type = "secondary", direction = "default", children }) => {
	return type === "secondary" ? (
		<button className="secondary">{children}</button>
	) : type === "arrow" ? (
		<button className={`round ${direction}`}>
			<Arrow />
		</button>
	) : null;
};

Button.propTypes = {
	type: PropTypes.oneOf(["arrow", "secondary"]),
	direction: PropTypes.oneOf(["default", "alternate"]),
	children: PropTypes.node,
};

export default Button;
