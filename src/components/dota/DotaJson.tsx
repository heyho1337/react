"use client";
import Dota from '@dota/Dota';
import playersData from '@dota/players.json';
import teamsData from '@dota/teams.json';
import wlData from '@dota/wl.json';
import kdaData from '@dota/kda.json';

const dataMap = {
    players: playersData,
    teams: teamsData,
	wl: wlData,
	kda: kdaData,
};

class DotaJson extends Dota {
	
	async fetchData(dataKey: string, transformFn: (data: any) => any) {
		if (!this[dataKey + 'Stop'] && !this[dataKey + 'Loading']) {
			try {
				this[dataKey + 'Loading'] = true;

				// Load data from the appropriate JSON file
				const jsonData = dataMap[dataKey];

				if (transformFn && typeof transformFn === 'function') {
					// Apply transformFn if provided
					const transformedData = transformFn(jsonData);
					this.setData({ [dataKey]: transformedData, status: true });
				} else {
					// Use data directly if no transformFn provided
					this.setData({ [dataKey]: jsonData, status: true });
				}

				this.setStopFlag(dataKey);
			} catch (error) {
				const errorMessage = `Error fetching ${dataKey}: ${error.message}`;
				console.error(errorMessage);
				this.setData({ status: false, msg: errorMessage });
			} finally {
				this[dataKey + 'Loading'] = false;
			}

			return this.data;
		}
	}

	async getTeams() {
		return this.fetchData('teams', (data) =>
			data.map((team) => ({
				label: team.name,
				value: team.team_id,
			}))
		);
	}

	async getPlayerWL(playerId, player) {
		const jsonData = dataMap.wl;
		const wlRow = jsonData.find((row) => row.account_id === playerId);
		if (wlRow) {
			player.win = wlRow.win;
			player.lose = wlRow.lose;
		}
	}

	async getPlayerKDA(playerId, player) {
		const jsonData = dataMap.kda;
		const kdaRow = jsonData.find((row) => row.account_id === playerId);
		if (kdaRow) {
			player.k = kdaRow.k;
			player.d = kdaRow.d;
			player.a = kdaRow.a;
		}
	}
	

	async getPlayers() {
		const playersData = await this.fetchData('players', async (data) => {
			for (const row of data) {
				this.getPlayerKDA(row.account_id, row);
				this.getPlayerWL(row.account_id, row);
				this.calcPlayerStats(row);
			}
			this.getPlayerChunks(data);
			return data;
		});
		return playersData;
	}
}

const dota = new DotaJson();
export default dota;
