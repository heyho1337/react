"use client";

import { useDotaContext } from '@dota/DotaContext'; // Adjust the path
import React, { useEffect, useState } from 'react';
import dota from '@dota/Dota'; // Make sure the path is correct
import Pagination from '@common/Pagination'

const Players = ({
	page,
	end
}
) => {
	const { dotaData, updateDotaData } = useDotaContext(); // Use the context hook
  	const [playersData, setPlayersData] = useState(null);

	useEffect(() => {
	  const fetchData = async () => {
		  try {
			  const data = await dota.getPlayers();
			  console.log('Received data:', data);
			  setPlayersData(data);
			  updateDotaData(data); // Update the global Dota data
		  }
		  catch (error) {
			  console.error('Error fetching players:', error.message);
		  }
	  };

	  fetchData();
	}, []);

	return (
	  	<>
			<div className="playerList">
			  {playersData && (	
				  <div>
					  {/* Example: Display player names */}
					  {playersData.chunkedPlayers[page].map((player) => (
						  <div key={player.account_id}>{player.name}</div>
					  ))}
					  <Pagination
						  hasNextPage={end < playersData.chunkedPlayers.length}
						  hasPrevPage={page > 1}
						  url='team'
						  pageCount={playersData.chunkedPlayers.length}
					  />	
				  </div>
			  )}
		  	</div>
	  	</>
	);
};

export default Players;