import React, { useState, useEffect, useContext } from "react";
import "./RecipeItem.css";

import { Button } from "@material-ui/core";
import { RecipeContext } from "./../contexts/recipe-context";
import { Link, useHistory } from "react-router-dom";

const RecipeItem = ({ id, title, image }) => {
	const [selectedId, setSelectedId] = useState();

	// the url here is the url for cooking instructions obtained after the api call
	const [url, setUrl] = useState();
	const [cookingSteps, setCookingSteps] = useState([]);
	const [ingredients, setIngredients] = useState([]);

	const { addNewState } = useContext(RecipeContext);

	const history = useHistory();

	const getCookingInfo = () => {
		// use this code if u want to double click
		// uncomment and use

		// set selected recipies id
		// use the id - state to make an api call to new url
		// display the "info" on the mainbar.
		// get "cooking intructions url" from the next api call.
		// set url as a state
		// create context with "id, url, cooking-steps, ingredients" as states.
		// use this context glovally to display info on the mainbar and its sub components.
		// make all api calls from the sidebar

		setSelectedId(id);

		console.log(selectedId);

		// // make calls to api here (UNCOMMENT THIS SEGMENT TO DOUBLE CLICK)

		// const axios = require("axios");
		// axios
		// 	.get(
		// 		`https://api.spoonacular.com/recipes/informationBulk?ids=${id}&apiKey=a1e7d475643f418dbbfe62de98e110c6`
		// 	)
		// 	.then((response) => {
		// 		console.log(response.data[0].sourceUrl);
		// 		const recipeUrl = response.data[0].sourceUrl;
		// 		setUrl(recipeUrl);
		// 		// if (url) {
		// 		axios
		// 			.get(
		// 				`https://api.spoonacular.com/recipes/extract?url=${recipeUrl}&forceExtraction=true&analyze=true&apiKey=a1e7d475643f418dbbfe62de98e110c6`
		// 			)
		// 			.then((response) => {
		// 				console.log(response.data.extendedIngredients);
		// 				setIngredients(response.data.extendedIngredients);
		// 				console.log(ingredients);
		// 				console.log(response.data.analyzedInstructions[0].steps);
		// 				setCookingSteps(response.data.analyzedInstructions[0].steps);
		// 				console.log(cookingSteps);

		// 				const newRecipeState = {
		// 					ingredients: ingredients,
		// 					cookingSteps: cookingSteps,
		// 					id: selectedId,
		// 					image: image,
		// 					url: url,
		// 					title: title,
		// 				};
		// 				addNewState(newRecipeState);
		// 			})
		// 			.catch((error) => {
		// 				console.log(error);
		// 			});
		// 		// }
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	};

	// first update on change to "ID" to fetch recipe "URL"
	useEffect(() => {
		const axios = require("axios");

		console.log(selectedId);
		history.push(`/:${selectedId}`);

		axios
			.get(
				`https://api.spoonacular.com/recipes/informationBulk?ids=${selectedId}&apiKey=a1e7d475643f418dbbfe62de98e110c6`
			)
			.then((response) => {
				console.log(response.data[0].sourceUrl);
				const recipeUrl = response.data[0].sourceUrl;
				setUrl(recipeUrl);

				console.log(url);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [selectedId]);

	// second call to get cooking steps and ingredients on change of "URL"

	useEffect(() => {
		const axios = require("axios");

		axios
			.get(
				`https://api.spoonacular.com/recipes/extract?url=${url}&forceExtraction=false&analyze=false&apiKey=a1e7d475643f418dbbfe62de98e110c6`
				// https://api.spoonacular.com/recipes/informationBulk?ids=715538
			)

			.then((response) => {
				const recipeIngreds = response.data.extendedIngredients;

				setIngredients(recipeIngreds);
				console.log("ingreds on first call : ", ingredients);

				// console.log(response.data.analyzedInstructions[0].steps);
				setCookingSteps(response.data.analyzedInstructions[0].steps);
				console.log("cookingsteps on first call : ", cookingSteps);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [url]);

	// last call to function like "DOUBLECLICK" to update the cooking steps and ingreds
	// #temp_fix

	useEffect(() => {
		const axios = require("axios");

		axios
			.get(
				`https://api.spoonacular.com/recipes/extract?url=${url}&forceExtraction=false&analyze=false&apiKey=a1e7d475643f418dbbfe62de98e110c6`
			)
			.then((response) => {
				console.log("ingreds on last call: ", ingredients);
				console.log("cooking steps on last call: ", cookingSteps);

				// write the code for setting new state
				const newRecipeState = {
					ingredients: ingredients,
					cookingSteps: cookingSteps,
					id: selectedId,
					image: image,
					url: url,
					title: title,
				};
				addNewState(newRecipeState);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [ingredients, cookingSteps]);

	// lets believe the above step will make the api call in one click
	//  disadv : making multiple calls to the api -  fast depletion of credit.

	return (
		<li className="recipe-item">
			<img src={image} alt="food_img" className="recipe-img" />
			<div className="recipe-info">
				<h3>{title}</h3>

				<Button
					variant="outlined"
					size="small"
					className="recipe-btn"
					onClick={getCookingInfo}
				>
					Cooking Info
				</Button>
			</div>
		</li>
	);
};

export default RecipeItem;
