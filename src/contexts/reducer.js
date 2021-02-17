const reducerFunction = (state, action) => {
	switch (action.type) {
		case "ADD_NEW_STATE":
			return {
				title: action.payload.title,
				id: action.payload.id,
				image: action.payload.image,
				url: action.payload.url,
				cookingSteps: action.payload.cookingSteps,
				ingredients: action.payload.ingredients,
			};
		default:
			return state;
	}
};

export default reducerFunction;
