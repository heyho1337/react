

import db from '@db/FireStore';
import Dota from '@dotaClass/Dota';
import userFunc from '@class/userFunctions';
import UserDataProps from '@customTypes/UserDataProps';

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

	async joinLeague(leagueId: string, email: string) {
		const userData: UserDataProps = await userFunc.getUserData(email);
		const userLeagues = userData.leagueId;
		if (!userLeagues.includes(leagueId)) {
			userLeagues.push(leagueId);
			const updateData = {
				leagueId: userLeagues
			}
			const updateCondition = {
				user_email: email
			}
			db.change('users', updateData, updateCondition);
		}
	}

}

const league = new League();
export default league;