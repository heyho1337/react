"use client";

import { useDotaContext } from '@dota/DotaContext';
import React, { useEffect, useState } from 'react';
import dota from '@dota/DotaJson';
import PlayerCard from '@dota/PlayerCard';
import Pagination from '@common/Pagination';

const Players = ({
    page,
    end
}) => {
    const { dotaData, updateDotaData } = useDotaContext();
    const [playersData, setPlayersData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dota.getPlayers();
                //console.log('Received data:', data);

                if (data && data.chunkedPlayers) {
                    setPlayersData(data);
                    updateDotaData(data); // Update the global Dota data
                } else {
                    //console.error('Invalid data structure:', data);
                }
            } catch (error) {
                //console.error('Error fetching players:', error.message);
            }
        };

        fetchData();
    }, [updateDotaData]);

    return (
		<>
			{playersData && (
				<>
					<div className="playerList">
						{/* Example: Display player names */}
						{playersData.chunkedPlayers[page].map((player) => (
							<PlayerCard key={player.account_id} player={player} dota={dota} />
						))}
					</div>
					{/* Example: Display player names */}
					<Pagination
						hasNextPage={end < playersData.chunkedPlayers.length}
						hasPrevPage={page > 1}
						url='team'
						pageCount={playersData.chunkedPlayers.length}
					/>
				</>
			)}
		</>
	);
};

export default Players;
