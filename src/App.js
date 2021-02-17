import React from "react";
import "./App.css";
import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";
import RecipeProvider from "./contexts/recipe-context";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<RecipeProvider>
			<Router>
				<div className="app">
					{/* <h1 className="app__title">Recipe Cookbook</h1> */}
					<div className="app__container">
						<Sidebar />
						<Mainbar />
					</div>
				</div>
			</Router>
		</RecipeProvider>
	);
}

export default App;
