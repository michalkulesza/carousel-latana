import { useEffect } from "react";

const useHorizontalSwipe = (
	ref,
	swipeLeftCallback = () => null,
	swipeRightCallback = () => null,
	minDistance = 100
) => {
	const node = ref?.current;

	useEffect(() => {
		if (node) {
			let startPosition;

			const handleStartTouch = e => {
				e.preventDefault();
				startPosition = e.changedTouches[0].screenX;
			};
			const handleEndTouch = e => {
				e.preventDefault();
				const endPosition = e.changedTouches[0].screenX;
				const touchMoveDifference = startPosition - endPosition;

				if (Math.abs(touchMoveDifference) > minDistance) {
					if (touchMoveDifference > 0) {
						swipeRightCallback();
					} else {
						swipeLeftCallback();
					}
				}
			};

			node.addEventListener("touchstart", handleStartTouch);
			node.addEventListener("touchend", handleEndTouch);

			return () => {
				node.removeEventListener("touchstart", handleStartTouch);
				node.removeEventListener("touchend", handleEndTouch);
			};
		}
	}, [swipeRightCallback, swipeLeftCallback, minDistance, node]);
};

export default useHorizontalSwipe;
