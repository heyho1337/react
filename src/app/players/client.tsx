"use client";
import React from 'react';
import multiSelect from '@common/MultiSelect';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import filters from '@common/Filter';
import { useOptimistic } from 'react';

const PlayerClient = ({ children }: any) => {
	const router = useRouter();
	const pathname = usePathname();

	const searchParams = useSearchParams();
	const positions = filters.setParamsClient(searchParams.get('positions'));
	const teams = filters.setParamsClient(searchParams.get('teams'));

	const checkedTeam: any = typeof window !== 'undefined' ? Array.from(document.getElementsByName('selectTeam')) : [];
	const selectedTeams = multiSelect.createSelectedItems(checkedTeam, teams);

	const checkedPositions: any = typeof window !== 'undefined' ? Array.from(document.getElementsByName('selectPosition')) : [];
	const selectedPositions = multiSelect.createSelectedItems(checkedPositions, positions);

	const [formState, setFormState] = useOptimistic(false);

	const changeFilter = (e: any) => {
		if (e.target.classList.contains('changeable')) {
			setFormState(true);
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

	const handleClick = (e: any) => {
		// Check if the clicked element has a specific attribute or class
		if (e.target.name === 'selected-selectTeam' || e.target.name === 'selected-selectPosition') {
			setFormState(true);
			e.preventDefault();
			const currentSearchParams = new URLSearchParams(Array.from(searchParams));
			if (e.target.name === 'selected-selectTeam') {
				const teams = multiSelect.removeSelectedElement(selectedTeams, e.target, 'selectTeam');
				currentSearchParams.set('teams', '['+teams.join(',')+']');
			}
			if (e.target.name === 'selected-selectPosition') {
				const positions = multiSelect.removeSelectedElement(selectedPositions, e.target, 'selectPosition');
				currentSearchParams.set('positions', '['+positions.join(',')+']');
			}
			const search = currentSearchParams.toString();
			const query = search ? `?${search}` : "";
			router.replace(`${pathname}${query}`);
		}
	}

	function FilterForm() {
		console.log(formState);
		return (
			<form onClick={handleClick} onChange={changeFilter} className={`filter ${!formState ? '' : 'disabled'}`}>
				{children}
				{formState && (
					<img src="/images/main/loading.gif" className="loadState" alt="loading" width="56" />
				)}
			</form>
		);
	}

  	return (
    	<>
			<h1>Manage your team</h1>
			<form onClick={handleClick} onChange={changeFilter} className={`filter ${!formState ? '' : 'disabled'}`}>
				{children}
				{formState && (
					<img src="/images/main/loading.gif" className="loadState" alt="loading" width="56" />
				)}
			</form>
    	</>
  	);
};

export default PlayerClient;