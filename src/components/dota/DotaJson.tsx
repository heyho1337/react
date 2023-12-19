import Dota from '@dota/Dota';
import playersData from '@json/players.json';
import teamsData from '@json/teams.json';
import wlData from '@json/wl.json';
import kdaData from '@json/kda.json';

const dataMap = {
    players: playersData,
    teams: teamsData,
	wl: wlData,
	kda: kdaData,
};

class DotaJson extends Dota {

	async fetchData(funcName) {
		try {
		  if (typeof this[funcName] === 'function') {
			const data = await this[funcName]();
			return data;
		  } else {
			console.error(`${funcName} is not a function.`);
			return null;
		  }
		} catch (error) {
		  console.error(`Error fetching data for ${funcName}:`, error);
		  return null;
		}
	  }
	
	async renderData(funcName, parameters, renderFunction){
		const data = await this.fetchData(funcName);
	  
		if (!data) {
		  return null;
		}
		if (funcName === 'teams') {
			console.log(data);
		}
		return renderFunction(data, parameters);
	};
	
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
		const jsonData = dataMap['players'];
		for (const row of jsonData) {
			this.getPlayerKDA(row.account_id, row);
			this.getPlayerWL(row.account_id, row);
			this.calcPlayerStats(row);
		}
		this.setData({ ['players']: jsonData });
		this.getPlayerChunks(jsonData);
		return this.data.chunkedPlayers;
	}

	async getTeams() {
		const jsonData = dataMap['teams'];
		const transformedData = jsonData.map((team) => ({
		  	label: team.name,
		  	value: team.team_id,
		}));
		this.setData({ ['teams']: transformedData });
		return transformedData;
	}
}

const dota = new DotaJson();
export default dota;
