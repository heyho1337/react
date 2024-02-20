

import db from '@db/FireStore';
import Dota from '@dotaClass/Dota';

class League extends Dota{

	list(){
		const leagueData = {
			active: 1,
		}
		return db.get('leagues', leagueData);
	};

	async getLeagues(){
		const list = await this.list();
		this.getPlayerChunks(list);
		return this.data.chunkedPlayers;
	}

	async joinLeague(leagueId: string, email: string){
		const updateData = {
			leagueId: leagueId
		}
		const updateCondition = {
			user_email: email
		}
		db.change('users', updateData, updateCondition);
	}

}

const league = new League();
export default league;