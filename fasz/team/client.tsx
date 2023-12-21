
//import AuthRoute from '@common/AuthRoute';
import React, { useState, useRef } from 'react';
import multiSelect from '@common/MultiSelect';

const TeamClient = ({ children }) => {

	const positions = [
		{ value: '1', label: 'Carry' },
		{ value: '2', label: 'Mid' },
		{ value: '3', label: 'Offlane' },
		{ value: '4', label: 'Support' },
		{ value: '5', label: 'Hard support' },
	];

	const [selectedPositions, setSelectedPositions] = useState();
	const [selectedTeams, setSelectedTeams] = useState();

	console.log("client rendered");

	const changeFilter = (e) => {
		if (e.target.classList.contains('changeable')) {
			multiSelect.setMultiSelect('selectTeam', setSelectedTeams, e);
			multiSelect.setMultiSelect('selectPosition', setSelectedPositions, e);
		}
	};

	const handleClick = (e) => {
		// Check if the clicked element has a specific attribute or class
		if (e.target.name === 'selected-team' || e.target.name === 'selected-selectPosition') {
			e.preventDefault();
			if (e.target.name === 'selected-team') {
				multiSelect.removeSelectedElement(selectedTeams,setSelectedTeams, e.target.value, 'selectTeam')
			}
			if (e.target.name === 'selected-selectPosition') {
				multiSelect.removeSelectedElement(selectedPositions,setSelectedPositions, e.target.value, 'selectPosition')
			}
		}
	}

  	return (
    	<>
			<h1>Manage your team</h1>
			<form onClick={handleClick} onChange={changeFilter} className="filter">
				<div className="selectedItems select-1">
					<label>Selected Team</label>		
					{selectedTeams && (
						selectedTeams.map((item: {value:number, label:string}) => (
							<button data-title={item.label} className="changeable" name="selected-team" value={item.value} key={item.value}>{item.label}</button>
						))
					)}
				</div>		
				{multiSelect.multiSelectHTML(2,'selectPosition','positions',positions,selectedPositions)}
				{children}
			</form>
    	</>
  	);
};

export default TeamClient;