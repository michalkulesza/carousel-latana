import "./App.css";

import { Button } from "./components";

const App = () => {
	return (
		<div className="App">
			<h1>hello world</h1>
			<Button type="arrow" />
			<Button type="arrow" direction="alternate" />
			<Button>Learn more</Button>
		</div>
	);
};

export default App;
