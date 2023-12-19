"use client";
import Dota from '@dota/Dota';

class DotaApi extends Dota{
	
	async fetchData(url: string, dataKey: string, transformFn: (data: any) => any) {
		if (!this[dataKey + 'Stop'] && !this[dataKey + 'Loading']) {
			try {
				this[dataKey + 'Loading'] = true;
				const response = await fetch(url);

				if (response.ok) {
					const responseData = await response.json();
					const transformedData = transformFn(responseData); // Apply transformFn
					this.setData({ [dataKey]: transformedData, status: true });
					this.setStopFlag(dataKey);
				} else {
					const errorMessage = `Error fetching ${dataKey}: ${response.status} ${response.statusText}`;
					console.error(errorMessage);
					this.setData({ status: false, msg: errorMessage });
				}
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

	async getPlayerMatches(playerId, player) {
		const url = 'https://api.opendota.com/api/players/' + playerId + '/matches';
		const response = await fetch(url);
		let k = 0;
		let d = 0;
		let a = 0;
		if (response.ok) {
			const responseData = await response.json();
			for (let i = 0; i < responseData.length; i++) {
				k = k + responseData[i].kills;
				d = d + responseData[i].deaths;
				a = a + responseData[i].assists;
			}
			player.k = k;
			player.d = d;
			player.a = a;
			return {
				k: k,
				d: d,
				a: a
			}
		} else {
			return false
		}
	}
	
	async getTeams() {
		return this.fetchData(
			'https://api.opendota.com/api/teams',
			'teams',
			(data) =>
				data.map((team) => ({
					label: team.name,
					value: team.team_id,
				}))
		);
	}

	async getPlayerKDA(playerId, player) {
		const url = 'https://api.opendota.com/api/players/' + playerId + '/kda';
		const response = await fetch(url);
		if (response.ok) {
			const responseData = await response.json();
			player.k = responseData.k;
			player.d = responseData.d;
			player.a = responseData.a;
		} else {
			return false
		}
	}

	async getPlayerWL(playerId, player) {
		const url = 'https://api.opendota.com/api/players/' + playerId + '/wl';
		const response = await fetch(url);
		if (response.ok) {
			const responseData = await response.json();
			player.w = responseData.win;
			player.l = responseData.lose;
		} else {
			return false
		}
	}

	async getPlayers() {
		return this.fetchData(
			'https://api.opendota.com/api/proPlayers',
			'players',
			async (data) => {
				this.getPlayerChunks(data);
				return data;
			}
		);
	}
}

const dota = new DotaApi();
export default dota;