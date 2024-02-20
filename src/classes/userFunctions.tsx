import { getServerSession } from "next-auth";
import playerFunctions from '@class/playerFunctions';
import dota from '@dotaClass/DotaJson';
import { authOptions } from '@api/route.js'
import SessionProps from '@customTypes/SessionProps';
import db from '@db/FireStore';

class UserFunctions {

	async getUserTeam() {
		const session = await getServerSession(authOptions);
		let team = null;
		let extendedTeam = null;

		if (session && session.user) {
			team = await playerFunctions.getTeam(session.user.email);
		
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

	async getUserData() {
		const session = await getServerSession(authOptions);
		let user = null;

		if (session && session.user) {
			const userData = {
				user_email: session.user.email
			}
			user = await db.get('users', userData);
		}

		return user;
	}

	async getUserLeague(leagueId: string) {
		return await db.getById('leagues', leagueId);
	}
}

const userFunctions = new UserFunctions();
export default userFunctions;