import React from "react";
import "./Instruction.css";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalDiningIcon from "@material-ui/icons/LocalDining";

const Instruction = ({ instruction }) => {
	return (
		<>
			<li className="instruction">
				<LocalDiningIcon className="instruction-icon" fontSize="small" />
				{instruction}
			</li>
		</>
	);
};

export default Instruction;
