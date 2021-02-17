import React, { createContext, useReducer } from "react";
import reducerFunction from "./reducer";

// create context
export const RecipeContext = createContext();

// initial state
const initialState = {
	title: "",
	id: null,
	image: "",
	url: "",
	cookingSteps: [],
	ingredients: [],
};

const RecipeProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducerFunction, initialState);

	const addNewState = (newState) => {
		dispatch({ type: "ADD_NEW_STATE", payload: newState });
		console.log(state);
	};
	return (
		<RecipeContext.Provider value={{ state: state, addNewState }}>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
