"use client";

import AuthRoute from '@common/AuthRoute';
import Players from '@dota/Players';
import Teams from '@dota/Teams';
import React, { useState, useRef } from 'react';

const Team = ({searchParams,}: {searchParams: { [key: string]: string | string[] | undefined }}) => {
	const page = Number(searchParams['page'] ?? '1')
	const end = Number(page) + 1;

	const positions = [
		{ value: '1', label: 'Carry' },
		{ value: '2', label: 'Mid' },
		{ value: '3', label: 'Offlane' },
		{ value: '4', label: 'Support' },
		{ value: '5', label: 'Hard support' },
	];

	const [selectedPosition, setSelectedPosition] = useState();
	const selectRef = useRef(null);

	const handleChange = () => {
		if (selectRef.current) {
			const selectedOption = selectRef.current.options[selectRef.current.selectedIndex];
			console.log(selectedOption);
			setSelectedPosition({
				value: selectedOption.value,
				label: selectedOption.text,
			});
		}
  	};

  	return (
    	<>
			<h1>Manage your team</h1>
			<form className="filter">
				<div className="top">
					<Teams />
					<select ref={selectRef} value={selectedPosition?.value} onChange={handleChange}>
						<option key={selectedPosition?.value ?? 0} value={selectedPosition?.value ?? 0}>{selectedPosition?.label ?? 'All positions'}</option>		
						{positions.map((positions) => (
							<option key={positions.value} value={positions.value}>{positions.label}</option>
						))}
					</select>
				</div>		
			  	<Players
					page={page}
					end={end}
				/>	
			</form>
    	</>
  	);
};

export default AuthRoute(Team);
