import React, { useMemo } from 'react';
import dota from '@dotaClass/DotaJson';
import multiSelect from '@common/MultiSelect';
import filters from '@common/Filter';

const Teams = (parameters: any) => {
	const teams = filters.setParamsServer(parameters.selectedTeams);

	const data = useMemo(async () => {
		const fetchData = async () => {
			return await dota.renderData('getTeams', parameters, (data, parameters) => {
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

					return multiSelect.multiSelectHTML(1, 'selectTeam', 'team', data, selectedItems);
				}

				return null;
			});
		};

		return await fetchData();
	}, [parameters.selectedTeams, teams]);

	return <>{data}</>;
};

export default Teams;