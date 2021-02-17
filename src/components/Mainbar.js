import React, { useContext } from "react";
import "./Mainbar.css";
import { RecipeContext } from "./../contexts/recipe-context";
import Instruction from "./Instruction";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { Route, Switch } from "react-router-dom";

const Mainbar = () => {
	const { state } = useContext(RecipeContext);

	// remove the check in the future
	// coz id exists always

	// put the two mainbar fragments into different components and call them
	// use switch to break
	return (
		<div className="mainbar">
			<Switch>
				<Route path={`/:${state.id}`}>
					<>
						<div className="mainbar-left">
							<img src={state.image} alt="" className="left-img" />

							<div className="left-list">
								<h2>{state.title}</h2>
								<h3>INGREDIENTS NEEDED</h3>
								<ul className="left-ingredient-list">
									{state.ingredients.map((ingredient) => (
										<li className="left-list-item" key={Math.random()}>
											- {ingredient.originalString}
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="mainbar-right">
							<h2>
								<MenuBookIcon className="menubook-icon" />
								Cooking Instructions
							</h2>
							<ul className="right-instruction-list">
								{state.cookingSteps.map((step) => (
									<Instruction instruction={step.step} />
								))}
							</ul>
						</div>
					</>
				</Route>

				<Route exact path="/">
					<div className="mainbar-placeholder">
						<div className="placeholder-main">
							<h1>
								Use the searchbar to search for recipes, ingredients and
								cuisines -{" "}
							</h1>
							<h3>
								Select the "COOKING INFO" button to get details of your favouite
								recipe
							</h3>
						</div>

						<p>Hav fun cooking!!! 🥩🍕🥓🍘 ❤</p>
					</div>
				</Route>
			</Switch>
		</div>
	);
};

export default Mainbar;
