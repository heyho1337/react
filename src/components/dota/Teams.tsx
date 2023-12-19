import React from 'react';
import dota from '@dota/DotaJson';
import multiSelect from '@common/MultiSelect';

const Teams = (parameters) => {
	const renderTeams = dota.renderData('getTeams', { page: 1, end: 10 }, (data, parameters) => (
		<>
			{data && (
				multiSelect.multiSelectHTML('selectTeam','teams',data,[])
			)}
		</>
	));
	  
	return renderTeams;
};

export default Teams;
