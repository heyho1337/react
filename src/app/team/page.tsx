"use client";

import AuthRoute from '@common/AuthRoute';
import dota from '@dota/Dota';
import React, { useEffect, useState } from 'react';

const Team = () => {
	const [playersData, setPlayersData] = useState(null);
	useEffect(() => {
		dota.getPlayers().then((data) => {
			console.log('Received data:', data);
			setPlayersData(data);
		}).catch((error) => {
		  	console.error('Error fetching players:', error.message);
		});
	}, []);
	
	return (
		<>
			<span>Team</span>
			{playersData && dota.showPlayers(playersData)}
		</>
	);
}

export default AuthRoute(Team);
