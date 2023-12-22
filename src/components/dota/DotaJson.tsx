import Dota from '@dota/Dota';
import playersData from '@json/players.json';
import teamsData from '@json/teams.json';
import wlData from '@json/wl.json';
import kdaData from '@json/kda.json';
import matchesData from '@json/matches.json';
import profileData from '@json/profile.json';
import heroesData from '@json/heroes.json';
import DotaPlayerProps from '@types/DotaPlayerProps'
import DotaPlayerProfileProps from '@types/DotaPlayerProfileProps';
import DotaHeroProps from '@type/DotaHeroProps';

const dataMap = {
    players: playersData,
    teams: teamsData,
	wl: wlData,
	kda: kdaData,
	profile: profileData,
	matches: matchesData,
	heroes: heroesData
};

class DotaJson extends Dota {

	async fetchData(funcName: string) {
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
	
	async renderData(funcName: string, parameters: any[], renderFunction: (data: any[], parameters: any[]) => void) {
		const data = await this.fetchData(funcName);
	
		if (!data) {
			return null;
		}
	
		return renderFunction(data, parameters);
	}
	
	async getPlayerWL(account_id: number, player: DotaPlayerProps) {
		const jsonData = dataMap.wl;
		const wlRow = jsonData.find((row) => row.account_id === account_id);
		if (wlRow) {
			player.win = wlRow.win;
			player.lose = wlRow.lose;
		}
	}

	getHero(id: number) {
		const jsonData = dataMap.heroes;
		const heroRow: DotaHeroProps = jsonData.find((row) => row.id === id);
		if (heroRow) {
			return heroRow;
		}
	}

	async getPlayerMatches(account_id: number, player: DotaPlayerProps) {
		const jsonData = dataMap.matches;
		const matchesData = jsonData.find((row) => row.account_id === account_id);
		if (matchesData) {
			for (const row of matchesData.matches) {
				const hero = this.getHero(row.hero_id);
				if (hero) {
					row.hero_name = hero.localized_name;
				}
			}
			player.matches = matchesData.matches;
		}
	}

	async getPlayerProfile(account_id: number) {
		const jsonData = dataMap.profile;
		const playerProfileRow: DotaPlayerProfileProps = jsonData.find((row) => row.profile.account_id === account_id);
		if (playerProfileRow) {
			this.getPlayerKDA(account_id, playerProfileRow);
			this.getPlayerWL(account_id, playerProfileRow);
			this.getPlayerMatches(account_id, playerProfileRow);
			this.calcPlayerStats(playerProfileRow);
			return playerProfileRow;
		}
	}

	async getPlayerKDA(account_id: number, player: DotaPlayerProps) {
		const jsonData = dataMap.kda;
		const kdaRow = jsonData.find((row) => row.account_id === account_id);
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
