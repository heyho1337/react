import Dota from './Dota';
import DotaPlayerProps from '@customTypes/DotaPlayerProps';
import ItemProps from '@customTypes/ItemProps';
import DotaPlayerProfileProps from '@customTypes/DotaPlayerProfileProps';
class DotaApi extends Dota{
	
	async fetchData(url: string, dataKey: string, transformFn: (data: any) => any) {
		try {
			const response = await fetch(url);
			if (response.ok) {
				const responseData = await response.json();
				const transformedData = transformFn(responseData); // Apply transformFn
				this.setData({ [dataKey]: transformedData, status: true });
				return this.data;
			} else {
				const errorMessage = `Error fetching ${dataKey}: ${response.status} ${response.statusText}`;
				console.error(errorMessage);
			}
		} catch (error: any) {
			const errorMessage = `Error fetching ${dataKey}: ${error.message}`;
			console.error(errorMessage);
		}
	}

	async getPlayerMatches(account_id: string | number, player: DotaPlayerProps) {
		const url = 'https://api.opendota.com/api/players/' + account_id + '/matches';
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

	async getPlayerProfile(account_id: string | number) {
		const url = 'https://api.opendota.com/api/players/' + account_id;
		const response = await fetch(url);
		if (response.ok) {
			const result: any = await response.json();
			result.map(async (player: DotaPlayerProfileProps) => {
				await this.getPlayerWL(player.account_id, player);
				await this.getPlayerKDA(player.account_id, player);
				return result;
			});
		}
	}
	
	async getTeams() {
		return this.fetchData(
			'https://api.opendota.com/api/teams',
			'teams',
			(data) =>
				data.map((team: any) => ({
					label: team.name,
					value: team.team_id,
				}))
		);
	}

	async getPlayerKDA(account_id: string | number, player: DotaPlayerProfileProps) {
		const url = 'https://api.opendota.com/api/players/' + account_id + '/kda';
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

	async getPlayerWL(account_id: string | number, player: any) {
		const url = 'https://api.opendota.com/api/players/' + account_id + '/wl';
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
				data.map(async (player: DotaPlayerProfileProps) => {
					await this.getPlayerWL(player.account_id, player);
					await this.getPlayerKDA(player.account_id, player);
				});
				this.getPlayerChunks(data);
				return data;
			}
		);
	}
}

const dota = new DotaApi();
export default dota;