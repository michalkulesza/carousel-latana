import React, { useRef, useState, useEffect } from "react";
import generateID from "../../helpers/generateID";
import { useRect } from "../../hooks/useRect";
import PropTypes from "prop-types";
import "./Carousel.css";

import { Button } from "../../components";
import Item from "./Item/Item";

const Carousel = ({ heading, subHeading, items = [], gap = 24, padding = 36, maxWidth = 1320, itemsNum = 3 }) => {
	const containerRef = useRef(null);
	const contentRef = useRef(null);
	const containerRect = useRect(containerRef);
	const contentRect = useRect(contentRef);
	const minimumItemsNum = itemsNum * 3;

	const [itemsAddedToTheSide, setItemsAddedToTheSide] = useState(undefined);
	const [marginLeft, setMarginLeft] = useState(undefined);
	const [scrolledPixels, setScrolledPixels] = useState(0);
	const [scrolledTiles, setScrolledTiles] = useState(0);
	const [data, setData] = useState(items);

	const contentHeight = contentRect.height;
	const currentWidth = containerRect.width;
	const containerWidth = currentWidth < maxWidth ? currentWidth : maxWidth;
	const containerSizeDifference = currentWidth - maxWidth;

	const scrollable = data.length > itemsNum;
	const carouselLeftMargin = containerSizeDifference > 0 ? containerSizeDifference / 2 : 0;
	const itemWidth = (containerWidth - gap * itemsNum * 1.5 - padding) / itemsNum;

	//Triple items to enable infinite scrolling, and save number of added items on each side
	useEffect(() => {
		if (data.length < minimumItemsNum) {
			const newData = JSON.parse(JSON.stringify([...items, ...data, ...items]));
			newData.forEach(item => (item.id = generateID()));

			setItemsAddedToTheSide(items.length - 2);
			setData(newData);
			setScrolledPixels(0);
		}
	}, [itemWidth, data.length, minimumItemsNum, data, items, itemsAddedToTheSide]);

	//Calculate the size of the added items to the side so the carousel can be centered, recalculate on window resize
	useEffect(() => {
		const setLeftMargin = () => {
			if (itemsAddedToTheSide) {
				const newMarginLeft = (itemWidth + gap) * itemsAddedToTheSide;
				setMarginLeft(-newMarginLeft);
				setScrolledPixels(0);
			}
		};
		setLeftMargin();

		window.addEventListener("resize", setLeftMargin());
		return () => window.removeEventListener("resize", setLeftMargin());
	}, [gap, itemWidth, itemsAddedToTheSide]);

	const handleScrollForward = () => {
		if (scrollable) {
			const newScrolledPixels = scrolledPixels - (itemWidth + gap);
			setScrolledPixels(newScrolledPixels);

			const newScrolledTiles = scrolledTiles + 1;
			setScrolledTiles(newScrolledTiles);

			const dataCopy = [...data];
			const removedElem = dataCopy.shift();
			const newData = [...dataCopy, removedElem];
			setData(newData);

			const newMarginLeft = marginLeft + itemWidth + gap;
			setMarginLeft(newMarginLeft);
		}
	};

	const handleScrollBackward = () => {
		if (scrollable) {
			const newScrolledPixels = scrolledPixels + (itemWidth + gap);
			setScrolledPixels(newScrolledPixels);

			const newScrolledTiles = scrolledTiles - 1;
			setScrolledTiles(newScrolledTiles);

			const dataCopy = [...data];
			const removedElem = dataCopy.pop();
			const newData = [removedElem, ...dataCopy];
			setData(newData);

			const newMarginLeft = marginLeft - itemWidth - gap;
			setMarginLeft(newMarginLeft);
		}
	};

	return (
		<div className="carousel__container" ref={containerRef}>
			<div className="carousel__header" style={{ maxWidth: `${maxWidth}px`, padding: `0 ${padding}px` }}>
				<h1 className="carousel__heading">{heading}</h1>
				<h3>{subHeading}</h3>
			</div>

			<div className="carousel__contentWrapper" style={{ height: `${contentHeight}px` }}>
				<div
					className="carousel__content"
					style={{
						marginLeft: `${carouselLeftMargin + marginLeft}px`,
						padding: `${padding}px`,
						transform: `translateX(${scrolledPixels}px)`,
					}}
					ref={contentRef}
				>
					{data.map((item, i) => (
						<Item
							key={item.id}
							imageSrc={item.imageSrc}
							imageAlt={item.imageAlt}
							heading={item.heading}
							content={item.content}
							buttonContent={item.buttonContent}
							buttonSrc={item.buttonSrc}
							width={itemWidth}
							marginRight={gap}
							opacity={i < itemsAddedToTheSide ? 0 : i > itemsAddedToTheSide + itemsNum - 1 ? 0.2 : 1}
						/>
					))}
				</div>
			</div>
			{scrollable && (
				<div className="carousel__buttons" style={{ maxWidth: `${maxWidth}px`, padding: `0 ${padding}px` }}>
					<Button type="arrow" direction="alternate" handler={handleScrollBackward}></Button>
					<Button type="arrow" handler={handleScrollForward}></Button>
				</div>
			)}
		</div>
	);
};

Carousel.propTypes = {
	heading: PropTypes.string.isRequired,
	subHeading: PropTypes.string.isRequired,
	items: PropTypes.array,
	gap: PropTypes.number,
	padding: PropTypes.number,
	maxWidth: PropTypes.number,
	itemsNum: PropTypes.number,
};

export default Carousel;
