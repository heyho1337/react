import { getServerSession } from "next-auth";
import playerFunctions from '@class/playerFunctions';
import dota from '@dotaClass/DotaJson';
import { authOptions } from '@api/route.js'
import SessionProps from '@customTypes/SessionProps';
import db from '@db/Database';
import UserDataProps from '@customTypes/UserDataProps';

class userFunctions {

	async getUserTeam() {
		const session = await getServerSession(authOptions);
		const userData: UserDataProps = await this.getUserData(session?.user.email);
		let team = null;
		let extendedTeam = null;
		if (session && session.user) {
			team = await playerFunctions.getTeam(session.user.email,userData.active_league);
			if (team && team.length > 0) {
				extendedTeam = await Promise.all(
					team.map(async (player) => {
						const extendedPlayer = { ...player, profile: await dota.getTeamPlayer(player.account_id) };
						return extendedPlayer;
					})
				);
			}
		}

		return { team, extendedTeam };
	}

	async getUserData(email: string): Promise<UserDataProps> {
		const userData = {
			user_email: email
		}
		const userDataFromDB = await db.get('users', userData);
        return userDataFromDB[0] as UserDataProps;
	}

	async getUserLeague(leagueId: string) {
		const leagueData = {
			league_id: leagueId
		}
		return await db.getById('leagues', leagueData);
	}
}

const userFunc = new userFunctions();
export default userFunc;