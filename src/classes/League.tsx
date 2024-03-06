import db from '@db/FireStore';
import Dota from '@dotaClass/Dota';
import userFunc from '@class/userFunctions';
import UserDataProps from '@customTypes/UserDataProps';
import { getServerSession } from "next-auth";
import { authOptions } from '@api/route.js'
class League extends Dota{

	public newLeagueId: string = "";

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

	async leaguePlayers(leagueId: string) {
		const users: UserDataProps[] = await db.get('users',{});
    	return users.filter(user => user.leagueId && user.leagueId.includes(leagueId));
	}

	async getLeague(leagueId: string){
		return db.getById('leagues', leagueId);
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
			await db.change('users', updateData, updateCondition);
			return true;
		}
	}

	async submitNewLeague(name: string) {
		const data = {
			active: 1,
			full: false,
			name: name
		};
		try {
			const newLeague = await db.set('leagues', data);
			if (newLeague !== null) {
				const session = await getServerSession(authOptions);
				let email: any;
				if (session && session.user) {
					email = session.user.email;
					const joinLeague = await league.joinLeague(newLeague.id, email);
					if (joinLeague === true) {
						this.newLeagueId = newLeague.id;
						return true;
					}
				}
			}
		} catch (error) {
			console.error('Error adding league:', error);
		}
	
	}

}

const league = new League();
export default league;