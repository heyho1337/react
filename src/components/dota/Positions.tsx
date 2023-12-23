import React from 'react';
import dota from '@dota/DotaJson';
import multiSelect from '@common/MultiSelect';
import { setParamsServer } from '@common/Filter';

const Positions = (parameters) => {
	const positions = setParamsServer(parameters.selectedPositions);
	const basicPositions = [
		{ value: 1, label: 'Carry' },
		{ value: 2, label: 'Mid' },
		{ value: 3, label: 'Offlane' },
		{ value: 4, label: 'Support' },
		{ value: 5, label: 'Hard support' },
	];
	const selectedItems = basicPositions
	.filter((checkbox) => {
		const isChecked = positions.includes(checkbox.value);
		return isChecked;
	})
	.map((checkbox) => ({
		value: checkbox.value,
		label: checkbox.label,
	}));
	return (
		<>
			{multiSelect.multiSelectHTML(2, 'selectPosition', 'position', basicPositions, selectedItems)}
		</>
	);
};

export default Positions;
