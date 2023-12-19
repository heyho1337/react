"use client";

import AuthRoute from '@common/AuthRoute';
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

	const changeFilter = (e) => {
		if (e.target.classList.contains('changeable')) {
			multiSelect.setMultiSelect('selectTeam', setSelectedTeams, e);
			multiSelect.setMultiSelect('selectPosition', setSelectedPositions, e);
		}
	};

  	return (
    	<>
			<h1>Manage your team</h1>
			<form onChange={changeFilter} className="filter">
				<div className="selectedTeams">
					{selectedTeams && (
						selectedTeams.map((team: {value:number, label:string}) => (
							<span key={team.value}>{team.label}</span>
						))
					)}
				</div>		
				{multiSelect.multiSelectHTML('selectPosition','positions',positions,selectedPositions)}
				{children}
			</form>
    	</>
  	);
};

export default AuthRoute(TeamClient);