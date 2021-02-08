import React from "react";
import { Button } from "../../../components";
import PropTypes from "prop-types";
import "./Item.css";

const Item = ({
	imageSrc,
	imageAlt,
	heading,
	content,
	buttonContent = "More",
	buttonSrc = "/",
	width,
	marginRight = 16,
	opacity = 1,
}) => {
	const handleButton = () => {
		console.log(`Redirecting to ${buttonSrc}...`);
	};

	return (
		<div
			className="item__container"
			style={{ width: `${width}px`, marginRight: `${marginRight}px`, opacity: `${opacity}` }}
		>
			<div className="item__image">
				<img src={imageSrc} alt={imageAlt} />
			</div>
			<h2 className="item__heading">{heading}</h2>
			<div className="item__content">
				{content.split("\n").map((line, i) => (
					<p key={i}>{line}</p>
				))}
			</div>
			<Button handler={handleButton}>{buttonContent}</Button>
		</div>
	);
};

Item.propTypes = {
	imageSrc: PropTypes.string.isRequired,
	imageAlt: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	buttonContent: PropTypes.string,
	marginRight: PropTypes.number,
	buttonSrc: PropTypes.string,
	opacity: PropTypes.number,
};

export default Item;
