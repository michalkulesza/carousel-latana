import "./App.css";
import useWindowSize from "./hooks/useWindowSize";

import { Carousel } from "./components";
import { ITEMS } from "./fixtures/data";

const App = () => {
	const { width } = useWindowSize();
	const carouselItemsOnScreen = width < 500 ? 1 : width < 900 ? 2 : 3;

	return (
		<div className="App">
			<Carousel
				heading="Latana Knowledge Center"
				subHeading="Everything you need to know about the best brand tracking solution in the world."
				items={ITEMS}
				itemsNum={carouselItemsOnScreen}
			/>
		</div>
	);
};

export default App;
