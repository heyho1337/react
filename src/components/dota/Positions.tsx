import React from 'react';
import dota from '@dota/DotaJson';
import multiSelect from '@common/MultiSelect';
import { setParamsServer } from '@common/Filter';

const Positions = (parameters: any) => {
	const positions = setParamsServer(parameters.selectedPositions);
	const basicPositions = [
		{ value: 1, label: 'Core' },
		{ value: 2, label: 'Support' }
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
