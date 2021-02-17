import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import RecipeItem from "./RecipeItem";
import { Button } from "@material-ui/core";

const Sidebar = () => {
	const [showSearch, setShowSearch] = useState(false);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	// const tempSearch = "temp";

	useEffect(() => {
		const axios = require("axios");
		const API_KEY = "a1e7d475643f418dbbfe62de98e110c6";
		const baseUrl = "https://api.spoonacular.com/";
		// change query to search in the url below
		const searchUrl = `${baseUrl}/recipes/complexSearch?query=${search}&apiKey=${API_KEY}&number=3`;

		axios
			.get(searchUrl)
			.then((response) => {
				console.log(response.data.results);
				setSearchResults(response.data.results);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [search]);
	// tempsearch is used her, change it to search later

	return (
		// firstly, lets mount a start searching button
		// onClick of the button, we mount the search bar and th rest features inside the side bar

		<div className="sidebar">
			{/* searchbar */}
			{!showSearch ? (
				<Button
					variant="outlined"
					className="sidebar__button"
					onClick={() => setShowSearch(true)}
				>
					Start searching
				</Button>
			) : (
				<>
					<div className="sidebar__searchbar">
						{/* serach input */}

						<input
							className="searchbar__input"
							type="text"
							placeholder="search here ..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					{/* search list */}
					<div className="sidebar__search-list">
						{/* map : search-item comp */}
						{/* appply scroll styling here */}
						{searchResults.map((recipe) => (
							<RecipeItem
								key={recipe.id}
								id={recipe.id}
								title={recipe.title}
								image={recipe.image}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Sidebar;
