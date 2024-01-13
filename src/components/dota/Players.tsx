import React, { useMemo } from 'react';
import dota from '@dota/DotaJson';
import PlayerCard from '@dota/PlayerCard';
import Pagination from '@common/Pagination';
import DotaPlayerProps from '@customTypes/DotaPlayerProps';

const Players = (parameters: any) => {
	const data = useMemo(async () => {
		const fetchData = async () => {
			return await dota.renderData('getPlayers', parameters, (data) => (
				<>
					<div className="playerList">
						{data.length > 1
							? data[parameters.page].map((player: DotaPlayerProps) => (
								<PlayerCard key={player.account_id} player={player} />
							))
							: data[0] !== undefined &&
							data[0].map((player: DotaPlayerProps) => (
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
		};

		return await fetchData();
	}, [parameters]);

	return <>{data}</>;
};

export default Players;