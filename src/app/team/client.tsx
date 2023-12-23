"use client";
import React, { useState, useLayoutEffect } from 'react';
import multiSelect from '@common/MultiSelect';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { setParamsClient } from '@common/Filter';

const TeamClient = ({ children }) => {
	const router = useRouter();
	const pathname = usePathname();

	const searchParams = useSearchParams();
	const positions = setParamsClient(searchParams.get('positions'));
	const teams = setParamsClient(searchParams.get('teams'));

	const checkedTeam = typeof window !== 'undefined' ? Array.from(document.getElementsByName('selectTeam')) : [];
	const selectedTeams = multiSelect.createSelectedItems(checkedTeam, teams);

	const checkedPositions = typeof window !== 'undefined' ? Array.from(document.getElementsByName('selectPosition')) : [];
	const selectedPositions = multiSelect.createSelectedItems(checkedPositions, positions);


	const changeFilter = (e) => {
		if (e.target.classList.contains('changeable')) {
			const teams = multiSelect.setMultiSelect('selectTeam');
			const positions = multiSelect.setMultiSelect('selectPosition');
			const currentSearchParams = new URLSearchParams(Array.from(searchParams));
			currentSearchParams.set('positions', '['+positions.join(',')+']');
			currentSearchParams.set('teams', '['+teams.join(',')+']');
			const search = currentSearchParams.toString();
			const query = search ? `?${search}` : "";
			router.replace(`${pathname}${query}`);
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
				{children}
			</form>
    	</>
  	);
};

export default TeamClient;