import React from 'react';
import dota from '@dota/DotaJson';
import multiSelect from '@common/MultiSelect';
import { setParamsServer } from '@common/Filter';

const Teams = (parameters) => {
	const teams = setParamsServer(parameters.selectedTeams);
	const renderTeams = dota.renderData('getTeams', parameters, (data, parameters) => {
		if (data) {
			const selectedItems = data
				.filter((checkbox) => {
					const isChecked = teams.includes(parseInt(checkbox.value));
					checkbox.checked = isChecked;
					return isChecked;
				})
				.map((checkbox) => ({
					value: checkbox.value,
					label: checkbox.label,
				}));
	
			return (
				<>
					{multiSelect.multiSelectHTML(1, 'selectTeam', 'team', data, selectedItems)}
				</>
			);
		}
	
		return null;
	});
	  
	return renderTeams;
};

export default Teams;
