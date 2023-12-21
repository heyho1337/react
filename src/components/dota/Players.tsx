import React from 'react';
import dota from '@dota/DotaJson';
import PlayerCard from '@dota/PlayerCard';
import Pagination from '@common/Pagination';

const Players = (parameters) => {
	const renderPlayers = dota.renderData('getPlayers', parameters, (data) => (
		<>
		  <div className="playerList">
			{/* Example: Display player names */}
			{data[parameters.page].map((player) => (
			  <PlayerCard key={player.account_id} player={player} />
			))}
		  </div>
		  {/* Example: Display player names */}
		  <Pagination
			hasNextPage={parameters.end < data.length}
			hasPrevPage={parameters.page > 1}
			url="team"
			pageCount={data.length}
		  />
		</>
	));
	  
	return renderPlayers;
};

export default Players;
