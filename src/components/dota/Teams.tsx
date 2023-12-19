"use client";

import { useDotaContext } from '@dota/DotaContext';
import React, { useEffect, useState } from 'react';
import dota from '@dota/DotaJson';
import Select from 'react-select';

const TeamSelect = ({options, selectedOptions, onChange }) => {
  	return (
    	<Select
      		isMulti
      		options={options} // Use selectedOptions instead of TeamsData.teams
      		value={selectedOptions}
			onChange={onChange}
			placeholder="Select a team"	
    	/>
  	);
};

const Teams = () => {
  	const { dotaData, updateDotaData } = useDotaContext();
  	const [TeamsData, setTeamsData] = useState(null);
  	const [selectedOptions, setSelectedOptions] = useState([]);

  	const handleMultiSelectChange = (selectedValues) => {
    	setSelectedOptions(selectedValues);
  	};

  	useEffect(() => {
		const fetchData = async () => {
	  		try {
				const data = await dota.getTeams();
				//console.log('Received data:', data);
  
				if (data && Array.isArray(data.teams)) {
		  			setTeamsData(data.teams);
		  			setSelectedOptions(data.selectedTeams || []);
		  			updateDotaData(data);
				}
				else {
		  			//console.error('Invalid data structure:', data);
				}
			}
			catch (error) {
				//console.error('Error fetching teams:', error.message);
	  		}
		};
  
		fetchData();
  	}, [updateDotaData]);

  	return (
    	<>
      		{TeamsData && (
        		<TeamSelect
				  	selectedOptions={selectedOptions}
				  	options={TeamsData}
          			onChange={handleMultiSelectChange}
        		/>
      		)}
    	</>
  	);
};

export default Teams;
