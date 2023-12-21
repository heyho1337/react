import React from 'react';
import dota from '@dota/DotaJson';
import multiSelect from '@common/MultiSelect';

const Teams = (parameters) => {
	const renderTeams = dota.renderData('getTeams', parameters, (data, parameters) => (
		<>
			{data && (
				multiSelect.multiSelectHTML(1,'selectTeam','teams',data,[])
			)}
		</>
	));
	  
	return renderTeams;
};

export default Teams;
