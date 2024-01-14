import Dota from '@dota/Dota';
import playersData from '@json/players.json';
import teamsData from '@json/teams.json';
import wlData from '@json/wl.json';
import kdaData from '@json/kda.json';
import matchesData from '@json/matches.json';
import profileData from '@json/profile.json';
import heroesData from '@json/heroes.json';
import DotaHeroProps from '@customTypes/DotaHeroProps';
import WLProps from '@customTypes/WLProps';
import DotaPlayerProfileProps from '@customTypes/DotaPlayerProfileProps';
import DotaPlayerProps from '@customTypes/DotaPlayerProps';

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

	async fetchData(funcName: string, parameters: any) {
		try {
		  	if (typeof this[funcName] === 'function') {
				const data = await this[funcName](parameters);
				return data;
			}
			else {
				console.error(`${funcName} is not a function.`);
				return null;
		  	}
		}
		catch (error) {
			console.error(`Error fetching data for ${funcName}:`, error);
		  	return null;
		}
	}
	
	async renderData(funcName: string, parameters: any[], renderFunction: (data: any[], parameters: any[]) => void) {
		const data = await this.fetchData(funcName, parameters);
	
		if (!data) {
			return null;
		}
	
		return renderFunction(data, parameters);
	}
	
	async getPlayerWL(account_id: string | number, player: DotaPlayerProfileProps | DotaPlayerProps) {
		const jsonData = dataMap.wl;
		const wlRow: WLProps = jsonData.find((row) => row.account_id === account_id);
		if (wlRow && player !== undefined) {
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

	async getPlayerMatches(account_id: string | number, player: DotaPlayerProfileProps) {
		const jsonData = dataMap.matches;
		const matchesData = jsonData.find((row) => row.account_id === account_id);
		if (matchesData) {
			for (const row of matchesData.matches) {
				const hero: DotaHeroProps = this.getHero(row.hero_id);
				if (hero) {
					(row as any).hero_name = hero.localized_name;
				}
			}
			if(player !== undefined) {
				player.matches = matchesData.matches;
			}
		}
	}

	async getPlayerProfile(account_id: string | number) {
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

	async getPlayerKDA(account_id: string | number, player: DotaPlayerProfileProps | DotaPlayerProps ) {
		const jsonData = dataMap.kda;
		const kdaRow = jsonData.find((row) => row.account_id === account_id);
		if (kdaRow && player !== undefined) {
			player.k = kdaRow.k;
			player.d = kdaRow.d;
			player.a = kdaRow.a;
		}
	}

	async getTeamPlayer(account_id: string | number) {
		const jsonData = dataMap.players;
		const playerRow = jsonData.find((row) => row.account_id === account_id);
		if (playerRow) {
			this.getPlayerKDA(account_id, playerRow);
			this.getPlayerWL(account_id, playerRow);
			this.calcPlayerStats(playerRow);
			return playerRow;
		}
	}


	async getPlayers(parameters: any) {
		const jsonData = dataMap['players'];
		var positions = Array();
		var teams = Array();
		if (parameters.selectedPositions !== undefined) {
			positions = JSON.parse(parameters.selectedPositions);
		}
		if (parameters.selectedTeams !== undefined) {
			teams = JSON.parse(parameters.selectedTeams);
		}
		const filteredData = jsonData.filter((player) => {
			const isInTeam = parameters.team.some((teamPlayer: any) => player.account_id === teamPlayer.account_id);
			(player as any).available = isInTeam ? 0 : 1;
			return (
				(positions.length === 0 || positions.includes(player.fantasy_role)) &&
				(teams.length === 0 || teams.includes(player.team_id))
			);
		});
		for (const row of filteredData) {
			this.getPlayerKDA(row.account_id, row);
			this.getPlayerWL(row.account_id, row);
			this.calcPlayerStats(row);
		}
		this.setData({ ['players']: filteredData });
		this.getPlayerChunks(filteredData);
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
