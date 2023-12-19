"use client";
import { useEffect, useState } from 'react';
import FireStore from '@db/FireStore';
import Pagination from '@common/Pagination'; // Adjust the path
import DotaPlayerProps from '@interfaces/DotaPlayerProps';

class Dota {
	private playersStop: boolean = false;
	private playersLoading: boolean = false;
	private teamsStop: boolean = false;
	private teamsLoading: boolean = false;
	private data = {
		players: [],
		chunkedPlayers: [],
		status: false,
		msg: '',
		teams: [],
		selectedTeams: [],
		allTeams: [],
	};

	constructor() {}

	getPlayerChunks(data) {
		const chunkSize = 20;
		const chunkedPlayers = [];
		for (let i = 0; i < data.length; i += chunkSize) {
			const chunk = data.slice(i, i + chunkSize);
			chunkedPlayers.push(chunk);
		}
	
		this.setData({ chunkedPlayers });
	}

	calcPlayerStats(player) {
		player.score = (player.k * 2) + player.a - player.d + player.win - player.lose;
	  
		if (!player.score) {
			player.score = Math.floor(Math.random() * 100) + 1;
		}
		player.total_games = player.win + player.lose;
		player.winrate = ((player.win / player.total_games) * 100).toFixed(2);
	}

	setStopFlag(dataKey: string) {
		this[dataKey + 'Stop'] = true;
	}

	setData(updatedData) {
		this.data = { ...this.data, ...updatedData };
	}
}

export default Dota;
